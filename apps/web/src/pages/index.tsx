import type { NextPage } from "next";
import NextError from "next/error";

// import { signIn, signOut } from "next-auth/react";

import { api } from "~/utils/api";
import { Logo } from "~/components/BlobscanLogo";
import { Button } from "~/components/Button";
import { BlockCard } from "~/components/Cards/BlockCard";
import { BlockCardSkeleton } from "~/components/Cards/BlockCard/Skeleton";
import { SectionCard } from "~/components/Cards/SectionCard";
import { TransactionCard } from "~/components/Cards/TransactionCard";
import { TransactionCardSkeleton } from "~/components/Cards/TransactionCard/Skeleton";
import { Link } from "~/components/Link";
import { SearchInput } from "~/components/SearchInput";

const BLOCKS_LIMIT = 4;
const TXS_LIMIT = 5;

const Home: NextPage = () => {
  const blocksQuery = api.block.getAll.useQuery({
    limit: BLOCKS_LIMIT,
  });
  const txsQuery = api.tx.getAll.useQuery({ limit: TXS_LIMIT });
  const error = blocksQuery.error || txsQuery.error;

  if (error) {
    return (
      <NextError
        title={error.message}
        statusCode={error.data?.httpStatus ?? 500}
      />
    );
  }

  const { data: blocks } = blocksQuery;
  const { data: txs } = txsQuery;

  return (
    <div>
      <div className="mt-3 flex flex-col items-center justify-center space-y-24">
        <div className=" flex w-7/12 flex-col items-center justify-center space-y-8">
          <Logo size="md" />
          <div className="flex w-7/12 flex-col items-stretch justify-center  space-y-2">
            <SearchInput />
            <span className="text-center text-sm text-contentSecondary-light  dark:text-contentSecondary-dark">
              Blob transaction explorer for the{" "}
              <Link href="https://www.eip4844.com/" isExternal>
                EIP-4844
              </Link>
            </span>
          </div>
        </div>
        <div className="flex w-9/12 flex-col space-y-16">
          <SectionCard
            title="Blocks"
            actionBtn={
              <Button
                variant="outline"
                label="View All Blocks"
                onClick={() => console.log("TODO: View all blocks")}
              />
            }
          >
            <div className="flex space-x-3">
              {blocksQuery.isLoading
                ? Array(BLOCKS_LIMIT)
                    .fill(0)
                    .map((_, i) => (
                      <div className="flex-grow" key={i}>
                        <BlockCardSkeleton />
                      </div>
                    ))
                : blocks?.map((b) => <BlockCard key={b.hash} block={b} />)}
            </div>
          </SectionCard>
          <SectionCard
            title="Blob Transactions"
            actionBtn={
              <Button
                variant="outline"
                label="View All Transactions"
                onClick={() => console.log("TODO: View all transactions")}
              />
            }
          >
            <div className=" flex flex-col space-y-5">
              {txsQuery.isLoading
                ? Array(TXS_LIMIT)
                    .fill(0)
                    .map((_, i) => <TransactionCardSkeleton key={i} />)
                : txs?.map((tx) => (
                    <TransactionCard key={tx.hash} transaction={tx} />
                  ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: session } = api.auth.getSession.useQuery();

//   const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: !!session?.user },
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       {session?.user && (
//         <p className="text-center text-2xl text-white">
//           {session && <span>Logged in as {session?.user?.name}</span>}
//           {secretMessage && <span> - {secretMessage}</span>}
//         </p>
//       )}
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={session ? () => void signOut() : () => void signIn()}
//       >
//         {session ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
