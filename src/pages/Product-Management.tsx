import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { Skeleton, Table, Popconfirm,Button } from "antd";
import { Space, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters ,AiOutlinePlus} from "react-icons/ai";
interface DataType {
    key: string| number;
  }
const ProductManagement = () => {
    const { data, error, isLoading } = useGetProductsQuery();
    console.log('d',data);
    
    const [removeProduct, { isLoading: isRemoveLoading }] = useRemoveProductMutation();
    if (isLoading) return <Skeleton />;
    if (error) return <div>Error</div>;
    const dataSource:DataType[] = data?.map(({ id, name, price,img ,desc}) => {
        return {
            key: id,
            name,
            price,
            img,
            desc
        };
    });
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Image",
            dataIndex: "img",
            key: "img",
            render: (text) => <img style={{width: '100px',borderRadius:'3px',height:'50px',boxShadow:'1px 1px #bdbfbf'}} src={text} alt="" />,
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Desc",
            dataIndex: "desc",
            key: "desc",
        },
        {
            title: "Action",
            key: "action",
            render: ({ key: id }: any) => {
                return (
                    <div className="flex">
                        <Popconfirm
                            placement="topLeft"
                            title={"Bạn muốn xóa chứ?"}
                            onConfirm={() => confirm(id)}
                            okText="Yes" 
                            cancelText="No"
                        >
                            <Button  type="primary" danger>
                                {isRemoveLoading ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    "Delete"
                                )}
                            </Button>
                        </Popconfirm>
                        <Button type="primary" style={{backgroundColor:'#24AAEE'}} className="ml-2">
                            <Link to={`/admin/product/${id}/edit`}>Edit</Link>
                        </Button>
                    </div>
                );
            },
        },
    ];
    const confirm = (id) => {
        removeProduct(id);
    };
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-2xl">Quản lý Sản phẩm</h2>
                <Button style={{backgroundColor:'#24AAEE'}} type="primary">
                    <Link to="/admin/product/add"><AiOutlinePlus/></Link>
                </Button>
            </div>

            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }}/>
        </div>
    );
};

export default ProductManagement;
