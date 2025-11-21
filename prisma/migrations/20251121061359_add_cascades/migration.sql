-- DropForeignKey
ALTER TABLE "portfolio_stocks" DROP CONSTRAINT "portfolio_stocks_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "portfolios" DROP CONSTRAINT "portfolios_userId_fkey";

-- DropForeignKey
ALTER TABLE "watchlist_stocks" DROP CONSTRAINT "watchlist_stocks_watchlistId_fkey";

-- DropForeignKey
ALTER TABLE "watchlists" DROP CONSTRAINT "watchlists_userId_fkey";

-- AddForeignKey
ALTER TABLE "portfolios" ADD CONSTRAINT "portfolios_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlists" ADD CONSTRAINT "watchlists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_stocks" ADD CONSTRAINT "portfolio_stocks_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "portfolios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "watchlist_stocks" ADD CONSTRAINT "watchlist_stocks_watchlistId_fkey" FOREIGN KEY ("watchlistId") REFERENCES "watchlists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
