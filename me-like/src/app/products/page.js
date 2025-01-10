import ProductList from "@/components/productList";
import { fetchProducts } from "../lib/fetchProducts";
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div>
      <ProductList products = {products}/>
    </div>
  );
}
