import { router } from "expo-router";

export const topIcons = [
    {
        id: "1",
        icon: "heart",
        action: () => router.push("tab/saved?saved=wish"),
        badge: "wish"
    },
    {
        id: "2",
        icon: "cart",
        action: () => router.push("tab/saved?saved=cart"),
        badge: "cart"
    }
];

export const brands = [
    {
        name: "Louis Vuitton",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLkVMW74-VsiHkYgiNVWnRNWuTbIjYMxkh3r1cA2NcVZffNskZzA_b9hE&s=10"
    },
    {
        name: "Gucci",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSetfBkGtzQ12_Z72n8-TVQed_YA4kd9vPByvP7KIQqz3Yk8sFJ0rqILL8&s=10"
    },
    {
        name: "Balenciaga",
        image: "https://i.pinimg.com/736x/03/16/d2/0316d27e265f5e4aa705ff28e2fed51e.jpg"
    },
    {
        name: "Calvin Klein",
        image: "https://cdn10.nnnow.com/web-images/large/styles/87NJGO32FW5/1677732849494/2.jpg"
    },
    {
        name: "Chanel",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROrdTleqwfGmeCq60uHwMmKAXO8RE2D7X2e1tiIdB-wsKn8VERrURE6m0&s=10"
    },
    {
        name: "Dior",
        image: "http://5.imimg.com/data5/ECOM/Default/2024/5/422510198/BS/RH/BB/82302975/fashion-myst-round-neck-tshirt-christian-dior-black-drop-shoulder-logo-print-t-shirt-45175944315182-500x500.jpg"
    },
    {
        name: "Hermès",
        image: "https://www.playful-dc.com/images/products/118537/118537_19.jpg"
    },
    {
        name: "Nike",
        image: "https://trilogymerchph.com/cdn/shop/products/Nike-Embroidered-Triple-Logo-Black-White-Red-DJ1569-010-3_300x300.jpg?v=1628840039"
    },
    {
        name: "Adidas",
        image: "https://i.pinimg.com/originals/05/da/54/05da54762f8082cc3910761488d038e2.jpg"
    },
    {
        name: "Zara",
        image: "https://cdn.shopify.com/s/files/1/1754/6207/files/2586ac9f-d4f4-4099-8c0c-7e15b5c03fab.jpg.webp?v=1704464599"
    },
    {
        name: "H&M",
        image: "https://res.cloudinary.com/teepublic/image/private/s--HRrKJVub--/t_Resized%20Artwork/c_crop,x_10,y_10/c_fit,w_374/c_crop,g_north_west,h_554,w_416,x_-15,y_-58/g_north_west,u_upload:v1446840612:production:blanks:cmnytzrskw2rtarpswec,x_-439,y_-383/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1521162260/production/designs/2476488_0.jpg"
    },
    {
        name: "Uniqlo",
        image: "https://i.ebayimg.com/images/g/p5gAAOSwjmhjzqbi/s-l1200.jpg"
    },
    {
        name: "Prada",
        image: "https://media.lanecrawford.com/E/A/H/EAH151_4_l.jpg"
    },
    {
        name: "Burberry",
        image: "https://www.lamode.com.hk/cdn/shop/products/BUR223STE01501NVY_03_fb64f45d-b4b0-4447-8a48-23339c5fbc9d_800x.jpg?v=1681813832"
    },
    {
        name: "Dolce & Gabbana",
        image: "https://www.dolcegabbana.com/dw/image/v2/BKDB_PRD/on/demandware.static/-/Sites-15/default/dwd876384e/images/zoom/G8OA3TFU7EQ_N0000_3.jpg?sw=740&sh=944"
    },
    {
        name: "Fendi",
        image: "https://i.ebayimg.com/images/g/ya0AAOSwj1Nj2WcN/s-l1200.jpg"
    },
    {
        name: "Versace",
        image: "https://images.thebestshops.com/product_images/original/SL10261-009_03-4c77f9.jpg"
    },
    {
        name: "Patagonia",
        image: "https://alwaysincolour.com/cdn/shop/files/patagonia-p-6-logo-responsibili-tee-t-shirt-touring-red-5_1200x_crop_center.progressive.jpg?v=1696344941"
    },
    {
        name: "Reformation",
        image: "https://i4.cloudfable.net/styles/550x550/600.330/Black/sola-scriptura-protestant-christian-reformation-5-solas-women-t-shirt-20240223111805-vrbhzeue-s1.jpg"
    },
    {
        name: "Everlane",
        image: "https://wetried.it/wp-content/uploads/2020/05/everlane-photo.jpg"
    },
    {
        name: "People Tree",
        image: "https://images-platform.99static.com//PUgYhrStct4qZUWJEtSc3v4v64E=/107x902:928x1723/fit-in/500x500/99designs-contests-attachments/61/61176/attachment_61176193"
    },
    {
        name: "Rhude",
        image: "https://img.bstn.com/eyJidWNrZXQiOiJic3RuLWltYWdlLXNlcnZlciIsImtleSI6ImNhdGFsb2cvcHJvZHVjdC9SSFBTMjRUVDA1MDEyNjExMDYxMS9SSFBTMjRUVDA1MDEyNjExMDYxMS0wNC5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiY29udGFpbiIsIndpZHRoIjo1ODAsImhlaWdodCI6NzI1LCJiYWNrZ3JvdW5kIjp7InIiOjI1NSwiZyI6MjU1LCJiIjoyNTUsImFscGhhIjoxfX19fQ=="
    }
];

export const coupons = [
    { id: "1", coupon: "coupon-10" },
    { id: "2", coupon: "friday-30" },
    { id: "3", coupon: "easter-60" }
];
