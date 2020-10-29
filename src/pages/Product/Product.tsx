import React, { useState } from 'react';
import { DashboardTitle, Modal } from '../../components';
import ProductForm, { ProductFormInputs } from '../../components/Product/ProductForm';
import ProductModel from "../../models/Product";
import { useTranslation } from 'react-i18next';
import { confirmAlert } from 'react-confirm-alert';
import { gql, useQuery, useMutation } from '@apollo/client';
import _ from "lodash";

interface ProductProps {};

const FETCH_PRODUCT = gql`
    query allProducts {
        allProducts {
            id
            name
            description
            price
            photo
        }
    }
`;

const CREATE_PRODUCT = gql`
    mutation CreateProduct($id: ID!, $name: String!, $description: String!, $price: String!, $photo: String!) {
        createProduct(id: $id, name: $name, description: $description, price: $price, photo: $photo) {
            id
        }
    }
`;

const UPDATE_PRODUCT = gql`
    mutation UpdateProduct($id: ID!, $name: String!, $description: String!, $price: String!, $photo: String!) {
        updateProduct(id: $id, name: $name, description: $description, price: $price, photo: $photo) {
            id
        }
    }
`;

const DELETE_PRODUCT = gql`
    mutation RemoveProduct($id: ID!) {
        removeProduct(id: $id)
    }
`;

const Product: React.FC<ProductProps> = (props: ProductProps): JSX.Element => {

    const [t] = useTranslation();
    const [seletecProduct, setSeletecProduct] = useState<ProductModel | null>(null);
    const [isOpenCreateProduct, setIsOpenCreateProduct] = useState<boolean>(false);
    
    const { loading, error, data, refetch } = useQuery(FETCH_PRODUCT);
    
    const [addProduct] = useMutation(CREATE_PRODUCT);
    const [updateProduct] = useMutation(UPDATE_PRODUCT);
    const [deleteProduct] = useMutation(DELETE_PRODUCT);


    if(loading) return(<p>Loading...</p>);

    const _renderProducts = () => {

        if(!data) return;
        
        const { allProducts } = data;

        const products = allProducts.map((product: ProductModel) => _renderProductItem(product));

        return(
            <div className="row">
                {products}
            </div>
        );

    }

    const _renderProductItem = (product: ProductModel) => {
        return(
            <div key={product.id} className="col-12 col-md-3 col-xl-2 same-height">
                <div className="card mt-3 w-100">
                    <img className="card-img-top img-fluid" src={product.photo} alt={product.name} />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{product.price} €</h6>
                        <p className="line-clamp">{product.description}</p>
                        <div className="card-body">
                            <a 
                                href="#"
                                className="card-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setSeletecProduct(product);
                                }}
                            >
                                {t('Edit')}
                            </a>
                            
                            <a 
                                href="#"
                                className="card-link text-danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    _handleDelete(product);
                                }}
                            >
                                {t('Remove')}
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const _handleDelete = (product: ProductModel) => {

        confirmAlert({
            title: '',
            message: t('confirm_delete_resource'),
            buttons: [
                {
                    label: t('Cancel'),
                    onClick: () => {}
                },
                {
                    label: t('Remove'),
                    onClick: () => {
                        deleteProduct({ variables: { id: product.id } });
                        refetch();
                    }
                }
            ]
        });

    }

    return(
        <div>
            
            <DashboardTitle
                title={t('Products')}
                handleAddResource={() => {
                    setIsOpenCreateProduct(true);
                }}
            />

            {_renderProducts()}

            <Modal 
                show={isOpenCreateProduct}
                title={t('Create Product')}
                removeVerticalSpacing={false}
                onClose={() => setIsOpenCreateProduct(false)}
                width="50vw"
            >
                <ProductForm
                    product={null}
                    onSubmit={(data: ProductFormInputs) => {
                        let product: ProductModel = {
                            ...data,
                            id: _.uniqueId(),
                            photo: "https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg"
                        }
                        addProduct({ variables: product });
                        refetch();
                        setIsOpenCreateProduct(false);
                    }}
                />
            </Modal>

            <Modal 
                show={seletecProduct != null}
                title={t('Edit Product')}
                removeVerticalSpacing={false}
                onClose={() => setSeletecProduct(null)}
                width="50vw"
            >
                <ProductForm
                    product={seletecProduct}
                    onSubmit={(data: ProductFormInputs) => {
                        let product: ProductModel = {
                            ...seletecProduct!,
                            ...data,
                        }
                        updateProduct({ variables: product });
                        refetch();
                        setSeletecProduct(null);
                    }}
                />
            </Modal>

        </div>
    );

};

export default React.memo(Product);
