import React from 'react';
import moment from 'moment';
import image from  '../../assets/images/print_logo.png';
import {Page, Text, View, Document, StyleSheet,Font,Image,pdf} from '@react-pdf/renderer';
import CairoRegular from '../../Amiri Cairo IBM Plex Arabic/Cairo/static/Cairo-Regular.ttf'; // Adjust the path to your font file
import CairoBold from '../../Amiri Cairo IBM Plex Arabic/Cairo/static/Cairo-Bold.ttf'; 


Font.register({
    family: 'Cairo',
    fonts: [
      { src: CairoRegular, fontWeight: 'normal' },
      { src: CairoBold, fontWeight: 'bold' },
    ],
  });

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    direction: 'rtl',
    textAlign: 'right',
    fontFamily: 'Cairo',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottom: '1px solid #000',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 12,
    fontFamily: 'Cairo',
    textAlign: 'center',
  },
  headerText2: {
    fontSize: 9,
    fontFamily: 'Cairo',
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Cairo',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Cairo',
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  logo: {
    width: '200px',
    height: 100,
  },
});

const Contract = ({ formData, tenant, car }) => {


  return (
    <Document>
      <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}> العاصور لتأجير السيارات</Text>
          <Text style={styles.headerText2}>سلواد - رام الله</Text>
          <Text style={styles.headerText2}>asour.rental.car@gmail.com </Text>
          <Text style={styles.headerText2}>0595383860 / 0598236606 </Text>
        </View>
        <Image style={styles.logo} src={image} />
        <View>
          <Text style={styles.headerText}>Al-Asour Rent a Car</Text>
          <Text style={styles.headerText2}>Silwad - Ramallah</Text>
          <Text style={styles.headerText2}>asour.rental.car@gmail.com </Text>
          <Text style={styles.headerText2}>0595383860 / 0598236606 </Text>
        </View>
      </View>
         <View style={styles.section}>
          <Text style={styles.title}>اتفاقية تأجير السيارات</Text>
          <Text style={styles.text}>تاريخ العقد: {moment().format('YYYY/MM/DD')}</Text>
          <Text style={styles.text}>اسم المستأجر: {formData.customer}</Text>
          <Text style={styles.text}>عنوان: {tenant.address}</Text>
          <Text style={styles.text}>الهاتف: {tenant.phone_number}</Text>
          <Text style={styles.text}>رقم الهوية: {tenant.id_number}</Text>
          <Text style={styles.text}>تاريخ الميلاد: {tenant.birth_date}</Text>
          <Text style={styles.text}>رخصة القيادة: {tenant.license_number}</Text>
          <Text style={styles.text}>تاريخ الإصدار: {tenant.license_start_date}</Text>
          <Text style={styles.text}>تاريخ الانتهاء: {tenant.license_end_date}</Text>
          <Text style={styles.text}>إجمالي المبلغ: {formData.totalAmount} شيكل</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>تفاصيل السيارة</Text>
          <Text style={styles.text}>نوع السيارة: {car.make} {car.model}</Text>
          <Text style={styles.text}>رقم اللوحة: {car.vehicle_id}</Text>
          <Text style={styles.text}>عدد الأيام: {formData.dayNum}</Text>
          <Text style={styles.text}>تاريخ الاستلام: {formData.start_date}</Text>
          <Text style={styles.text}>تاريخ الإرجاع: {formData.end_date}</Text>
          <Text style={styles.text}>الأجرة اليومية: {formData.pricePerDay} شيكل</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>شروط الاتفاقية</Text>
          <Text style={styles.text}>
            1. يتعهد المستأجر بالحفاظ على السيارة وقيادتها وفق القوانين.
          </Text>
          <Text style={styles.text}>
            2. يتحمل المستأجر كافة المسؤولية عن الأضرار الناجمة.
          </Text>
          <Text style={styles.text}>
            3. لا يجوز للمستأجر إعادة تأجير السيارة.
          </Text>
          <Text style={styles.text}>
            4. يجب إعادة السيارة في الوقت المحدد.
          </Text>
          <Text style={styles.text}>... إلخ</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>توقيع المستأجر: ______________</Text>
          <Text style={styles.text}>التاريخ: ______________</Text>
        </View> 
      </Page>
    </Document>
  );
};

export default Contract;
