import React, { useEffect } from "react";
import { Form, message, Modal } from "antd";
import ipc from "../ipc/index.js";

const AddModal = ({ visible, setVisible, setReload }) => {

  const [form] = Form.useForm(null);

  useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [visible, form]);

  const onOk = async () => {
    if (typeof ipc?.addDataJson !== 'function') {
      console.error('ipc.addDataJson is not a function');
    } else {
      try {
        const { weight } = form.getFieldsValue();
        ipc.addDataJson(weight).then(isSuccess => {
          if (isSuccess) {
            setReload(p => p + 1)
            message.success('✅ data added');
          } else {
            message.error('❌ data not added');
          }
        }
        )
      } catch (error) {
        console.error('❌ Error adding data:', error);
      } finally {
        setVisible(false);
      }
    }
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      title="提示"
      open={visible}
      okText="确定"
      cancelText="取消"
      visible={visible}
      onOk={onOk}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <Form form={form}>
        <Form.Item label="体重" name="weight">
          <input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddModal;
