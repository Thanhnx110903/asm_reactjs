import { useGetProductByIdQuery, useUpdateProductMutation } from "@/api/product";
import { Button, Form, Input, Skeleton } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = () => {
    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "");
    const [updateProduct, { isLoading: isUpdateLoading }] = useUpdateProductMutation();
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldsValue({
            name: productData?.name,
            price: productData?.price,
            img: productData?.img,
            desc: productData?.desc,
        });
    }, [productData]);

    const onFinish = (values: any) => {
        updateProduct({ ...values, id: idProduct })
            .unwrap()
            .then(() => {
                return navigate("/admin/product");
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    type FieldType = {
        name: string;
        price: number;
        img:string,
        desc:string
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-2xl mb-4">Cập nhật sản phẩm : tên sản phẩm</h2>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên sản phẩm"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên sản phẩm" },
                            { min: 3, message: "Ít nhất 3 ký tự" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                    label="Image"
                    name="img"
                    rules={[
                        { required: true, message: "Vui lòng nhập Image" },
                    ]}
                >
                    <Input />
                </Form.Item>
                    <Form.Item<FieldType> label="Giá sản phẩm" name="price">
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldType>
                    label="Description"
                    name="desc"
                >
                    <Input />
                </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" style={{backgroundColor:'#24AAEE'}} htmlType="submit">
                            Submit
                        </Button>
                        <Button
                            type="primary"
                            danger
                            className="ml-2"
                            onClick={() => navigate("/admin/product")}
                        >
                            Back
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default ProductEdit;
