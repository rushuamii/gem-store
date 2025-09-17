import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id
      }`;

  const data = await client.fetch(query);
  return data;
}

// Function to get related products from same category
async function getRelatedProducts(
  categoryName: string,
  currentProductId: string
) {
  const query = `*[_type == "product" && category->name == "${categoryName}" && _id != "${currentProductId}"][0...4] | order(_createdAt desc) {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
      }`;

  const data = await client.fetch(query);
  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);
  const relatedProducts = await getRelatedProducts(data.categoryName, data._id);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>

            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-5 w-5" />
              </Button>

              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl font-bold text-gray-800 md:text-2xl">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">
                  ${data.price + 30}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                Incl. Vat plus shipping
              </span>
            </div>

            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>

            <div className="flex gap-2.5"></div>

            <p className="mt-12 text-base text-gray-500 tracking-wide">
              {data.description}
            </p>
          </div>
        </div>

        {/* You May Also Like Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="mt-16 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              YOU MAY ALSO LIKE
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product: any) => (
                <div key={product._id} className="group">
                  <Link href={`/product/${product.slug}`}>
                    <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-800 group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {product.categoryName}
                      </p>
                      <p className="font-bold text-gray-900">
                        Rs {product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
