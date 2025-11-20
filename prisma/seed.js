import bcrypt from "bcrypt";
import prisma from "../src/config/db.js";

try {
  await prisma.portfolioStock.deleteMany();
  await prisma.watchlistStock.deleteMany();
  await prisma.portfolio.deleteMany();
  await prisma.watchlist.deleteMany();
  await prisma.stock.deleteMany();
  await prisma.user.deleteMany();

  // reset ids back to 0
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE users_id_seq RESTART WITH 1`);
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE portfolios_id_seq RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE watchlists_id_seq RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE portfolio_stocks_id_seq RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE watchlist_stocks_id_seq RESTART WITH 1`
  );
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE stocks_id_seq RESTART WITH 1`);

  const usersData = [
    {
      email: "sam@test.com",
      password: await bcrypt.hash("samtest1234", 10),
    },
    {
      email: "tyler@test.com",
      password: await bcrypt.hash("tylertest1234", 10),
    },
    {
      email: "zak@test.com",
      password: await bcrypt.hash("zaktest1234", 10),
    },
    {
      email: "yordin@test.com",
      password: await bcrypt.hash("yordintest1234", 10),
    },
    {
      email: "admin@test.com",
      password: await bcrypt.hash("admintest1234", 10),
      role: "ADMIN",
    },
  ];

  const users = await Promise.all(
    usersData.map((user) => prisma.user.create({ data: user }))
  );

  const portfolios = await Promise.all(
    users.map((user) =>
      prisma.portfolio.create({
        data: {
          name: `${user.email.split("@")[0]}'s portfolio`,
          userId: user.id,
        },
      })
    )
  );

  const watchlists = await Promise.all(
    users.map((user) =>
      prisma.watchlist.create({
        data: {
          name: `${user.email.split("@")[0]}'s watchlist`,
          userId: user.id,
        },
      })
    )
  );

  const stocksData = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      sector: "Technology",
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      sector: "Technology",
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      sector: "Communication Services",
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      sector: "Consumer Discretionary",
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      sector: "Technology",
    },
  ];

  const stocks = await Promise.all(
    stocksData.map((stock) => prisma.stock.create({ data: stock }))
  );

  for (const portfolio of portfolios) {
    const chosenStocks = stocks.slice(0, 3);

    await prisma.portfolioStock.createMany({
      data: chosenStocks.map((stock) => ({
        portfolioId: portfolio.id,
        stockId: stock.id,
      })),
      skipDuplicates: true,
    });
  }

  for (const watchlist of watchlists) {
    const chosenStocks = stocks.slice(2);

    await prisma.watchlistStock.createMany({
      data: chosenStocks.map((stock) => ({
        watchlistId: watchlist.id,
        stockId: stock.id,
      })),
      skipDuplicates: true,
    });
  }
} catch (error) {
  console.error("Seed failed:", error);
} finally {
  await prisma.$disconnect();
}
