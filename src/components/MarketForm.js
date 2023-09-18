import React, { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Row, 
  Col, 
  Upload, 
  Select 
} from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import CountryList from 'react-select-country-list';

const { Option } = Select;

const MarketForm = () => {
  const [form] = Form.useForm();
  const countryOptions = CountryList().getData();
  const [page, setPage] = useState(1);

  const onFinish = (values) => {
    // Add your logic to handle form submission, e.g., sending data to the blockchain
    console.log('Received values:', values);
  };

  const showNextFields = () => {
    setPage(page + 1);
  };

  const showPrevFields = () => {
    setPage(page - 1);
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Col span={12}>
        <style>
          {`
            .styled-input {
              border: 1px solid #ccc;
              border-radius: 5px;
              padding: 8px;
              width: 100%;
              box-sizing: border-box;
              margin-bottom: 12px;
            }
            .bold-text {
              font-weight: bold;
            }
            .button-group {
              margin-top: 12px;
            }
          `}
        </style>
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item 
            label="Country" 
            name="country"
            rules={[{ required: true, message: 'Please select a country' }]}
          >
            <Select>
              {countryOptions.map(country => (
                <Option key={country.value} value={country.value}>
                  {country.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item 
            label="Market Name" 
            name="marketName"
            rules={[{ required: true, message: 'Please enter the market name' }]}
          >
            <Input className="styled-input" />
          </Form.Item>
          <Form.Item 
            label="Website" 
            name="website"
            rules={[{ required: true, message: 'Please enter the website' }]}
          >
            <Input className="styled-input" />
          </Form.Item>
          <Form.Item 
            label="Market Type" 
            name="marketType"
            rules={[{ required: true, message: 'Please enter the market type' }]}
          >
            <Input className="styled-input" />
          </Form.Item>
          <Form.Item 
            label="Data Room Link" 
            name="dataRoomLink"
            rules={[{ required: true, message: 'Please enter the data room link' }]}
          >
            <Input className="styled-input" />
          </Form.Item>
          <Form.Item 
            label="Loan Requests Expire" 
            name="loanRequestsExpire"
            rules={[{ required: true, message: 'Please enter the expiry date' }]}
          >
            <Input className="styled-input" />
          </Form.Item>

          {page === 1 && (
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" onClick={showNextFields}>
                Next
              </Button>
            </Form.Item>
          )}

          {page === 2 && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item 
                    label="Loan Payment Cycle" 
                    name="loanPaymentCycle"
                    rules={[{ required: true, message: 'Please enter the payment cycle' }]}
                  >
                    <Input className="styled-input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                    label="Default Loans" 
                    name="defaultLoans"
                    rules={[{ required: true, message: 'Please enter the default loans' }]}
                  >
                    <Input className="styled-input" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item 
                    label="Loan Process Fee" 
                    name="loanProcessFee"
                    rules={[{ required: true, message: 'Please enter the process fee' }]}
                  >
                    <Input className="styled-input" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item 
                    label="Market Description" 
                    name="marketDescription"
                    rules={[{ required: true, message: 'Please enter the market description' }]}
                  >
                    <Input.TextArea className="styled-input" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item 
                    label="Market Image" 
                    name="marketImage"
                    rules={[{ required: true, message: 'Please upload an image' }]}
                  >
                    <Upload>
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Row justify="space-between" className="button-group">
                  <Button type="default" onClick={showPrevFields}>
                    <ArrowLeftOutlined /> Back
                  </Button>
                  <Button type="danger" htmlType="button">
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Row>
              </Form.Item>
            </>
          )}
        </Form>
      </Col>
      <Col span={10}>
        <img 
          src="https://v2.teller.org/assets/teller_v2_Step3.0c1ebb64.svg" 
          alt="Form Illustration"
          style={{ width: '60%', marginLeft: '20%' }}
        />
      </Col>
    </Row>
  );
};

export default MarketForm;
