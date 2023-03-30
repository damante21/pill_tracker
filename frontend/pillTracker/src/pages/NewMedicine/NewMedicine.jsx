import {
  theme,
  Breadcrumb,
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import ILayout from "../../components/ILayout/ILayout";
import moment from "moment";
import { useState, useEffect } from "react";

const { TextArea } = Input;

const NewMedicine = () => {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL
  const [form] = Form.useForm();
  const userToken = 'Token ' + localStorage.getItem('token')

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  const onFinish = async (values) => {
    const formattedDate = moment(values.start_date.$d).format("YYYY-MM-DD")
    const formattedRefillDate = moment(values.refill_date.$d).format("YYYY-MM-DD")
    const formattedTime = moment(values.time_of_first_med.$d).format("HH:mm:ss")
    try {
      const response = await fetch(`http://${base_url}/api/med`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userToken
      },
      body: JSON.stringify({
        medication_name: values.medication_name,
        medication_notes: values.medication_notes,
        dosage: values.dosage,
        start_date: formattedDate,
        refill_date: formattedRefillDate,
        times_per_day: values.times_per_day,
        time_of_first_med: formattedTime,
        number_of_pills: values.number_of_pills
      }),
    });
    console.log(JSON.stringify({
      medication_name: values.medication_name,
      medication_notes: values.medication_notes,
      dosage: values.dosage,
      rx_number: values.rx_number,
      start_date: formattedDate,
      refill_date: formattedRefillDate,
      times_per_day: values.times_per_day,
      time_of_first_med: formattedTime
    }))
    const result = await response.json();
    // console.log(result)
    if (response.ok) {
      alert('Medicine added successfully!');
      window.location.href = "/home"
    } else {
        alert('An error occurred while adding medicine. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while adding medicine.')
      console.error(err)
    }
  }
 
  const loadAutocomplete = () => {
    const autocompleteCSS = document.createElement('link');
    autocompleteCSS.href = 'https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/17.0.2/autocomplete-lhc.min.css';
    autocompleteCSS.rel = 'stylesheet';
    document.head.appendChild(autocompleteCSS);
  
    const jQueryScript = document.createElement('script');
    jQueryScript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js';
    document.head.appendChild(jQueryScript);
  
    const autocompleteScript = document.createElement('script');
    autocompleteScript.src = 'https://clinicaltables.nlm.nih.gov/autocomplete-lhc-versions/17.0.2/autocomplete-lhc.min.js';
    autocompleteScript.onload = () => {
      const drugStrengthsAutocompleter = new Def.Autocompleter.Prefetch('drug_strengths', []);
      const rxtermsAutocompleter = new Def.Autocompleter.Search('rxterms', 'https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search?ef=STRENGTHS_AND_FORMS');
  
      Def.Autocompleter.Event.observeListSelections("rxterms", function () {
        var drugField = $("#rxterms")[0];
        var autocomp = drugField.autocomp;
        var selectedValue = autocomp.getSelectedItemData()[0].text;
        if (selectedValue) {
          drugField.value = selectedValue;
          form.setFieldsValue({ medication_name: selectedValue }); // update the medication_name value
        }
        var strengths = autocomp.getSelectedItemData()[0].data["STRENGTHS_AND_FORMS"];
        if (strengths) {
          $("#drug_strengths")[0].autocomp.setListAndField(strengths, "");
        }
      });
  
      return () => {
        drugStrengthsAutocompleter.destroy();
        rxtermsAutocompleter.destroy();
      };
    };
    document.head.appendChild(autocompleteScript);
  };

  useEffect(() => {
    loadAutocomplete();
  }, []);

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
            <Input type="text" id="rxterms" placeholder="Drug name"/>
          </Form.Item>
          <Form.Item 
            name="dosage" 
            label="Dosage" 
            rules={[{ required: true }]}
            >
            <Input type="text" id="drug_strengths" placeholder="Strength list" onBlur={(event) => {
              const { value } = event.target;
              const strengths = $("#rxterms")[0].autocomp.getSelectedItemData()[0].data.STRENGTHS_AND_FORMS;
              const selectedStrength = strengths.find(strength => strength === value);
              const dosageValue = selectedStrength || strengths[0];
              form.setFieldsValue({ dosage: dosageValue });
            }}/>
          </Form.Item>
          <Form.Item
            name="medication_notes"
            label="Medication notes"
            rules={[{ required: false }]}
          >
            <TextArea placeholder="Amount of medication taken each time (ie. 2 tablets), reason for medication, etc" rows={4} />
          </Form.Item>
          <Form.Item
            name="start_date"
            label="Start date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="refill_date"
            label="Refill date or End Date"
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
            name="time_of_first_med"
            label="Time of first med"
            rules={[{ required: true }]}
          >
            <TimePicker />
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
