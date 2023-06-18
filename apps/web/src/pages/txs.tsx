import { type NextPage } from "next";
import NextError from "next/error";
import { useRouter } from "next/router";

import { getPaginationParams } from "~/utils/pagination";
import { BlobTransactionCard } from "~/components/Cards/SurfaceCards/BlobTransactionCard";
import { PaginatedListLayout } from "~/components/Layouts/PaginatedListLayout";
import { api } from "~/api-client";

const Txs: NextPage = function () {
  const router = useRouter();
  const { p, ps } = getPaginationParams(router.query);

  const { error, data } = api.tx.getAll.useQuery({ p, ps });

  if (error) {
    return (
      <NextError
        title={error.message}
        statusCode={error.data?.httpStatus ?? 500}
      />
    );
  }

  const { transactions, totalTransactions } = data || {};

  return (
    <PaginatedListLayout
      header={`Blob Transactions ${
        totalTransactions ? `(${totalTransactions})` : ""
      }`}
      items={transactions?.map((t) => (
        <BlobTransactionCard key={t.hash} transaction={t} />
      ))}
      totalItems={totalTransactions}
      page={p}
      pageSize={ps}
      itemSkeleton={<BlobTransactionCard />}
    />
  );
};

export default Txs;
