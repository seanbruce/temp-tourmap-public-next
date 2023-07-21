import { redirect } from "next/navigation";

interface IndexPageProps {
  params: { lang: string };
}

export default function IndexPage({ params: { lang } }: IndexPageProps) {
  return redirect(`/${lang}/products`);
}
