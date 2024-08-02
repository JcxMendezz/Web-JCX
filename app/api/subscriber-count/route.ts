export const GET = async () => {
  // const response = await fetch("", {
  // 	next: { revalidate: 120 },
  // })

  const data = { count: 25 };
  return Response.json(data, { status: 200 });
};
