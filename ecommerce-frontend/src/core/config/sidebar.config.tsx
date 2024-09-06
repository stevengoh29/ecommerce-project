import { IoBarcode, IoChevronForward, IoDocument, IoDocuments, IoList, IoMegaphone, IoPeople, IoPerson, IoPricetag, IoPricetags, IoSettings, IoStatsChart, IoStatsChartOutline, IoStorefront, IoWarning } from 'react-icons/io5'

export const NO_SIDEBAR_PATH = ['/login', '/register', '/forbidden', '/seller/register-store']

export const SIDEBAR_MENU_ADMIN = [
  {
    menuName: "Dashboard",
    icons: <IoStatsChart size={24} className="mr-5" />,
    href: '/admin'
  },
  {
    menuName: "Users",
    icons: <IoPeople size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "User Listing",
        href: "/admin/users",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Stores",
    icons: <IoStorefront size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Store Listing",
        href: "/admin/stores",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Categories",
    icons: <IoList size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Main Category",
        href: "/admin/main-categories",
        icons: <IoChevronForward size={16} />,
      },
      {
        menuName: "Sub Category",
        href: "/admin/sub-categories",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Coupons",
    icons: <IoPricetags size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "App Coupon",
        href: "/admin/app-coupon",
        icons: <IoChevronForward size={16} />,
      },
      {
        menuName: "Store Coupon",
        href: "/admin/store-coupon",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Campaigns",
    icons: <IoMegaphone size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Campaign Listing",
        href: "/progress",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Notifications",
    icons: <IoWarning size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Notification Listing",
        href: "/progress",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Reports",
    icons: <IoStatsChart size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Products",
        href: "/progress",
        icons: <IoChevronForward size={16} />,
      },
      {
        menuName: "Stores",
        href: "/progress",
        icons: <IoChevronForward size={16} />,
      },
      {
        menuName: "Orders",
        href: "/progress",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
]

export const SIDEBAR_MENU_SELLER = [
  {
    menuName: "Dashboard",
    icons: <IoStatsChart size={24} className="mr-5" />,
    href: '/seller'
  },
  {
    menuName: "Stores",
    icons: <IoStorefront size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Store Information",
        href: "/seller/store",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Categories",
    icons: <IoList size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Main Category",
        href: "/seller/main-categories",
        icons: <IoChevronForward size={16} />,
      },
      {
        menuName: "Sub Category",
        href: "/seller/sub-categories",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Products",
    icons: <IoBarcode size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Product Listing",
        href: "/seller/product",
        icons: <IoChevronForward size={16} />,
      },
      {
        menuName: "Product Display",
        href: "/seller/product-display",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Coupons",
    icons: <IoPricetags size={24} className="mr-5" />,
    subMenu: [
      // {
      //   menuName: "App Coupon",
      //   href: "/seller/app-coupon",
      //   icons: <IoChevronForward size={16} />,
      // },
      {
        menuName: "Store Coupon",
        href: "/seller/store-coupon",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Orders",
    icons: <IoDocuments size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Coupon Listing",
        href: "/progress",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Campaigns",
    icons: <IoMegaphone size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Campaign Listing",
        href: "/progress",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  {
    menuName: "Notifications",
    icons: <IoWarning size={24} className="mr-5" />,
    subMenu: [
      {
        menuName: "Notification Listing",
        href: "/progress",
        icons: <IoChevronForward size={16} />,
      }
    ],
  },
  // {
  //   menuName: "Reports",
  //   icons: <IoStatsChart size={24} className="mr-5" />,
  //   subMenu: [
  //     {
  //       menuName: "Products",
  //       href: "/progress",
  //       icons: <IoChevronForward size={16} />,
  //     },
  //     {
  //       menuName: "Stores",
  //       href: "/progress",
  //       icons: <IoChevronForward size={16} />,
  //     },
  //     {
  //       menuName: "Orders",
  //       href: "/progress",
  //       icons: <IoChevronForward size={16} />,
  //     }
  //   ],
  // },
]