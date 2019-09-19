import React, { Component } from "react";
import { AutoComplete, Button, Card, Cascader, Checkbox, Col, Form, Icon, Input, Row, Select, Tooltip } from "antd";
import Tags from "./../../dataDisplay/Tag/Dynamic";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: "Men's",
  label: "Men's",
  children: [{
    value: 'Topwear',
    label: 'Topwear',
    children: [{
      value: 'tshirts',
      label: 'tshirts',
    }],
  }],
}, {
  value: "Women's",
  label: "Women's",
  children: [{
    value: 'Topwear',
    label: 'Topwear',
    children: [{
      value: 'tshirts',
      label: 'tshirts',
    }],
  }],
}];


class Registration extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    const currencySelector = getFieldDecorator('prefix', {
      initialValue: 'Dollar',
    })(
      <Select style={{ width: 100 }}>
        <Option value="$">Dollar</Option>
        <Option value="Rs">Rupees</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Card className="gx-card" title="Registration Form">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Title&nbsp;
                <Tooltip title="Include keywords that buyers would use to search for your item.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={(
              <span>
                Description&nbsp;
                <Tooltip title="Start with a brief overview that describes your item’s finest features. Shoppers will only see the first few lines of your description at first, so make it count!.">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('Description', {
              rules: [{ required: true, message: 'Please input the description !', whitespace: true }],
            })(
              <Input />
            )}
          </FormItem>

       
        
          <FormItem
            {...formItemLayout}
            label="Category"
          >
            {getFieldDecorator('residence', {
              initialValue: ["Men's", "Women's", "Boy's", "Girl's"],
              rules: [{ type: 'array', required: true, message: 'Please select the category of the garment!' }],
            })(
              <Cascader options={residences} />
            )}
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="Select Size"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please select the size!' }],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.handleSelectChange}
              >
                <Option value="male">32</Option>
                <Option value="female">34</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="Select Sleeve length"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please select the sleeve lenght!' }],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.handleSelectChange}
              >
                <Option value="male">Sleeveless</Option>
                <Option value="male">Half-Sleeve</Option>
                <Option value="female">Full-Sleeve</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="Select neckline"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please select the neckline!' }],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.handleSelectChange}
              >
                <Option value="male">Round-neck</Option>
                <Option value="female">V-neck</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="Select Occasion"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please select the occasion!' }],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.handleSelectChange}
              >
                <Option value="male">Formals</Option>
                <Option value="female">Casuals</Option>
                <Option value="female">Wedding</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="Select Colour"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please select the colour!' }],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.handleSelectChange}
              >
                <Option value="male">Red</Option>
                <Option value="female">White</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
           {...formItemLayout}
           label="Select Material"
          >
            {getFieldDecorator('gender', {
              rules: [{ required: true, message: 'Please select the materials!' }],
            })(
              <Select
                placeholder="Select a option and change input text above"
                onChange={this.handleSelectChange}
              >
                <Option value="male">Cotton</Option>
                <Option value="female">Silk</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Phone Number"
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Enter Price"
          >
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input the price of the product!' }],
            })(
              <Input addonBefore={currencySelector} style={{ width: '100%' }} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="Tags"
          >
            <Tags />
          </FormItem>

        
          
          {/* <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I have read the <span className="gx-link">agreement</span></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem> */}
        </Form>
      </Card>
    );
  }

}

const RegistrationForm = Form.create()(Registration);
export default RegistrationForm;
