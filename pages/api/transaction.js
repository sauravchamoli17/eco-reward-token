import { getSecretMessage } from "@/helpers/constants";
import initDB from "@/helpers/initDb";
import Balances from "@/models/Balances";
import Events from "@/models/Events";
import chalk from "chalk";

initDB();

const getBalances = async (req, res) => {
  const arr = await Promise.all([
    Balances.find(),
    Events.find().sort({ createdAt: -1 }),
  ]);

  return res.status(200).json({ minters: arr[0], events: arr[1] });
};

const updateBalance = async (req, res) => {
  const { to, amount, hash, from, method } = JSON.parse(req.body);

  let fromBalance = await Balances.find({ address: from });
  fromBalance = fromBalance[0];

  let toBalance;

  if (method === "Transfer") {
    toBalance = await Balances.find({ address: to });
    toBalance = toBalance[0];
  }

  if (method === "Mint") {
    if (!fromBalance) {
      console.log(chalk.green(fromBalance));
      await new Balances({
        address: from,
        token: amount,
      }).save();
    } else {
      await Balances.updateOne(
        { address: from },
        { token: fromBalance.token + amount }
      );
    }
  } else if (method === "Transfer") {
    await Balances.updateOne(
      { address: from },
      { token: fromBalance.token - amount }
    );

    if (!toBalance) {
      await new Balances({
        address: to,
        token: amount,
      }).save();
    } else {
      await Balances.updateOne(
        { address: to },
        { token: toBalance.token + amount }
      );
    }
  } else if (method === "Burn") {
    await Balances.updateOne(
      { address: from },
      { token: fromBalance.token - 1 }
    );
  }

  await new Events({
    from,
    to,
    hash,
    amount,
    method,
  }).save();

  if (method === "Burn") {
    return res.status(200).json({ message: getSecretMessage() });
  }

  return res.status(200).json({ message: "Success" });
};

const transaction = (req, res) => {
  switch (req.method) {
    case "GET": {
      getBalances(req, res);
      break;
    }

    case "PATCH": {
      updateBalance(req, res);
      break;
    }
  }
};

export default transaction;
