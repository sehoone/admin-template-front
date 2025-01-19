interface TableRowData {
  address: string;
  age: number;
  id: number;
  name: string;
  nickname: string;
  role: string;
}

const roles = ['User', 'Admin', 'Manager', 'Guest'];

export const MOCK_TABLE_DATA: TableRowData[] = (() => {
  const data: TableRowData[] = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      address: `New York${i}`,
      age: i + 1,
      id: i,
      name: `Test${i}`,
      nickname: `Test${i}`,
      role: roles[Math.floor(Math.random() * roles.length)] as string,
    });
  }
  return data;
})();

export const MOCK_TREE_TABLE_DATA = [
  {
    date: '2020-08-01',
    id: 10_000,
    name: 'Test1',
    parentId: null,
    size: 1024,
    type: 'mp3',
  },
  {
    date: '2021-04-01',
    id: 10_050,
    name: 'Test2',
    parentId: null,
    size: 0,
    type: 'mp4',
  },
  {
    date: '2020-03-01',
    id: 24_300,
    name: 'Test3',
    parentId: 10_050,
    size: 1024,
    type: 'avi',
  },
  {
    date: '2021-04-01',
    id: 20_045,
    name: 'Test4',
    parentId: 24_300,
    size: 600,
    type: 'html',
  },
  {
    date: '2021-04-01',
    id: 10_053,
    name: 'Test5',
    parentId: 24_300,
    size: 0,
    type: 'avi',
  },
  {
    date: '2021-10-01',
    id: 24_330,
    name: 'Test6',
    parentId: 10_053,
    size: 25,
    type: 'txt',
  },
  {
    date: '2020-01-01',
    id: 21_011,
    name: 'Test7',
    parentId: 10_053,
    size: 512,
    type: 'pdf',
  },
  {
    date: '2021-06-01',
    id: 22_200,
    name: 'Test8',
    parentId: 10_053,
    size: 1024,
    type: 'js',
  },
  {
    date: '2020-11-01',
    id: 23_666,
    name: 'Test9',
    parentId: null,
    size: 2048,
    type: 'xlsx',
  },
  {
    date: '2021-06-01',
    id: 23_677,
    name: 'Test10',
    parentId: 23_666,
    size: 1024,
    type: 'js',
  },
  {
    date: '2021-06-01',
    id: 23_671,
    name: 'Test11',
    parentId: 23_677,
    size: 1024,
    type: 'js',
  },
  {
    date: '2021-06-01',
    id: 23_672,
    name: 'Test12',
    parentId: 23_677,
    size: 1024,
    type: 'js',
  },
  {
    date: '2021-06-01',
    id: 23_688,
    name: 'Test13',
    parentId: 23_666,
    size: 1024,
    type: 'js',
  },
  {
    date: '2021-06-01',
    id: 23_681,
    name: 'Test14',
    parentId: 23_688,
    size: 1024,
    type: 'js',
  },
  {
    date: '2021-06-01',
    id: 23_682,
    name: 'Test15',
    parentId: 23_688,
    size: 1024,
    type: 'js',
  },
  {
    date: '2020-10-01',
    id: 24_555,
    name: 'Test16',
    parentId: null,
    size: 224,
    type: 'avi',
  },
  {
    date: '2021-06-01',
    id: 24_566,
    name: 'Test17',
    parentId: 24_555,
    size: 1024,
    type: 'js',
  },
  {
    date: '2021-06-01',
    id: 24_577,
    name: 'Test18',
    parentId: 24_555,
    size: 1024,
    type: 'js',
  },
];

export const MOCK_API_DATA = [
  {
    available: true,
    category: 'Computers',
    color: 'purple',
    currency: 'NAD',
    description:
      'Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support',
    id: '45a613df-227a-4907-a89f-4a7f1252ca0c',
    imageUrl: 'https://avatars.githubusercontent.com/u/62715097',
    imageUrl2: 'https://avatars.githubusercontent.com/u/75395683',
    inProduction: false,
    open: true,
    price: '48.89',
    productName: 'Handcrafted Steel Salad',
    quantity: 70,
    rating: 3.780_582_329_574_367,
    releaseDate: '2024-09-09T04:06:57.793Z',
    status: 'error',
    tags: ['Bespoke', 'Handmade', 'Luxurious'],
    weight: 1.031_015_671_912_002_5,
  },
  {
    available: true,
    category: 'Toys',
    color: 'green',
    currency: 'CZK',
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    id: 'd02e5ee9-bc98-4de2-98fa-25a6567ecc19',
    imageUrl: 'https://avatars.githubusercontent.com/u/51512330',
    imageUrl2: 'https://avatars.githubusercontent.com/u/58698113',
    inProduction: false,
    open: false,
    price: '68.15',
    productName: 'Generic Cotton Gloves',
    quantity: 3,
    rating: 1.681_749_367_682_703_3,
    releaseDate: '2024-06-16T09:00:36.806Z',
    status: 'warning',
    tags: ['Rustic', 'Handcrafted', 'Recycled'],
    weight: 9.601_076_149_300_575,
  },
  {
    available: true,
    category: 'Beauty',
    color: 'teal',
    currency: 'OMR',
    description:
      'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    id: '2b72521c-225c-4e64-8030-611b76b10b37',
    imageUrl: 'https://avatars.githubusercontent.com/u/50300075',
    imageUrl2: 'https://avatars.githubusercontent.com/u/36541691',
    inProduction: true,
    open: true,
    price: '696.94',
    productName: 'Gorgeous Soft Ball',
    quantity: 50,
    rating: 2.361_581_777_372_057_5,
    releaseDate: '2024-06-03T13:24:19.809Z',
    status: 'warning',
    tags: ['Gorgeous', 'Ergonomic', 'License'],
    weight: 8.882_340_049_286_19,
  },
  {
    available: true,
    category: 'Games',
    color: 'silver',
    currency: 'SOS',
    description:
      'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
    id: 'bafab694-3801-452c-b102-9eb519bd1143',
    imageUrl: 'https://avatars.githubusercontent.com/u/89827115',
    imageUrl2: 'https://avatars.githubusercontent.com/u/55952747',
    inProduction: false,
    open: false,
    price: '553.84',
    productName: 'Bespoke Soft Computer',
    quantity: 29,
    rating: 2.176_412_873_760_271_7,
    releaseDate: '2024-09-17T12:16:27.034Z',
    status: 'error',
    tags: ['Elegant', 'Rustic', 'Recycled'],
    weight: 9.653_285_869_978_038,
  },
  {
    available: true,
    category: 'Toys',
    color: 'indigo',
    currency: 'BIF',
    description:
      'Andy shoes are designed to keep in mind durability as well as trends, the most stylish range of shoes & sandals',
    id: 'bf6dea6b-2a55-441d-8773-937e03d99389',
    imageUrl: 'https://avatars.githubusercontent.com/u/21431092',
    imageUrl2: 'https://avatars.githubusercontent.com/u/3771350',
    inProduction: true,
    open: true,
    price: '237.39',
    productName: 'Handcrafted Cotton Mouse',
    quantity: 54,
    rating: 4.363_265_388_265_461,
    releaseDate: '2023-10-23T13:42:34.947Z',
    status: 'error',
    tags: ['Unbranded', 'Handmade', 'Generic'],
    weight: 9.513_203_612_535_571,
  },
  {
    available: false,
    category: 'Tools',
    color: 'violet',
    currency: 'TZS',
    description:
      'New ABC 13 9370, 13.3, 5th Gen CoreA5-8250U, 8GB RAM, 256GB SSD, power UHD Graphics, OS 10 Home, OS Office A & J 2016',
    id: '135ba6ab-32ee-4989-8189-5cfa658ef970',
    imageUrl: 'https://avatars.githubusercontent.com/u/29946092',
    imageUrl2: 'https://avatars.githubusercontent.com/u/23842994',
    inProduction: false,
    open: false,
    price: '825.25',
    productName: 'Awesome Bronze Ball',
    quantity: 94,
    rating: 4.251_159_804_726_753,
    releaseDate: '2023-12-30T07:31:43.464Z',
    status: 'warning',
    tags: ['Handmade', 'Elegant', 'Unbranded'],
    weight: 2.247_473_385_732_636_8,
  },
  {
    available: true,
    category: 'Automotive',
    color: 'teal',
    currency: 'BOB',
    description: 'The Football Is Good For Training And Recreational Purposes',
    id: '652ef256-7d4e-48b7-976c-7afaa781ea92',
    imageUrl: 'https://avatars.githubusercontent.com/u/2531904',
    imageUrl2: 'https://avatars.githubusercontent.com/u/15215990',
    inProduction: false,
    open: false,
    price: '780.49',
    productName: 'Oriental Rubber Pants',
    quantity: 70,
    rating: 2.636_323_417_377_916,
    releaseDate: '2024-02-23T23:30:49.628Z',
    status: 'success',
    tags: ['Unbranded', 'Elegant', 'Unbranded'],
    weight: 4.812_965_858_018_838,
  },
  {
    available: false,
    category: 'Garden',
    color: 'plum',
    currency: 'LRD',
    description:
      'The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality',
    id: '3ea24798-6589-40cc-85f0-ab78752244a0',
    imageUrl: 'https://avatars.githubusercontent.com/u/23165285',
    imageUrl2: 'https://avatars.githubusercontent.com/u/14595665',
    inProduction: false,
    open: true,
    price: '583.85',
    productName: 'Handcrafted Concrete Hat',
    quantity: 15,
    rating: 1.371_600_527_752_802_7,
    releaseDate: '2024-03-02T19:40:50.255Z',
    status: 'error',
    tags: ['Rustic', 'Sleek', 'Ergonomic'],
    weight: 4.926_949_366_405_728_4,
  },
  {
    available: false,
    category: 'Industrial',
    color: 'salmon',
    currency: 'AUD',
    description:
      'The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design',
    id: '997113dd-f6e4-4acc-9790-ef554c7498d1',
    imageUrl: 'https://avatars.githubusercontent.com/u/49021914',
    imageUrl2: 'https://avatars.githubusercontent.com/u/4690621',
    inProduction: true,
    open: false,
    price: '67.99',
    productName: 'Generic Rubber Bacon',
    quantity: 68,
    rating: 4.129_840_682_128_08,
    releaseDate: '2023-12-17T01:40:25.415Z',
    status: 'error',
    tags: ['Oriental', 'Small', 'Handcrafted'],
    weight: 1.080_114_331_801_906_4,
  },
  {
    available: false,
    category: 'Tools',
    color: 'sky blue',
    currency: 'NOK',
    description:
      'The Nagasaki Lander is the trademarked name of several series of Nagasaki sport bikes, that started with the 1984 ABC800J',
    id: 'f697a250-6cb2-46c8-b0f7-871ab1f2fa8d',
    imageUrl: 'https://avatars.githubusercontent.com/u/95928385',
    imageUrl2: 'https://avatars.githubusercontent.com/u/47588244',
    inProduction: false,
    open: false,
    price: '613.89',
    productName: 'Gorgeous Frozen Ball',
    quantity: 55,
    rating: 1.646_947_205_998_534_6,
    releaseDate: '2024-10-13T12:31:04.929Z',
    status: 'warning',
    tags: ['Handmade', 'Unbranded', 'Unbranded'],
    weight: 9.430_690_557_758_114,
  },
];
