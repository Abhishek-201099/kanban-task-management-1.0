export default function Page({ params }) {
  const { boardId } = params;

  return <p>## {boardId}</p>;
}
