export interface Product{
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}

export let Products:Array<Product> =
      [{
          title: 'hello',
          price: 1,
          category: 'Bread',
          imageUrl: 'test'
      }
        ]
