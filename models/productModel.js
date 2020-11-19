const products = [
        {
            id: 1,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 2,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 3,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 4,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 5,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 6,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 7,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 8,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 9,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        },
        {
            id: 10,
            nameProduct: 'SET ĐỒ LƯỚI ÔM',
            price: '210.000',
            productDescription: 'No description for this products.',
            img: 'http://product.hstatic.net/1000290753/product/untitled_session2751_df891e66ca9442daa47100bce2e68478_master.jpg'
        }
]
exports.list = () => products;

exports.get = (id) => {
    return products.find(b => b.id == id);
}

