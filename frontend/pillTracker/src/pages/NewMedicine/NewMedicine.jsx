import {
  theme,
  Breadcrumb,
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import ILayout from "../../components/ILayout/ILayout";

const { TextArea } = Input;

const NewMedicine = () => {
  const [form] = Form.useForm();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <ILayout>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>New Medicine</Breadcrumb.Item>
      </Breadcrumb>
      <div
        className="site-layout-content"
        style={{
          background: colorBgContainer,
        }}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: "70vw" }}
        >
          <Form.Item
            name="medication_name"
            label="Medication name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="medication_notes"
            label="Medication notes"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="dosage" label="Dosage" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="rx_number"
            label="RX number"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="start_date"
            label="Start date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="end_date"
            label="End date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="times_per_day"
            label="Times per day"
            rules={[{ required: true }]}
          >
           <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="times_of_first_med"
            label="Times of first med"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="number_of_pills"
            label="Number of pills in bottle"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ILayout>
  );
};
export default NewMedicine;
