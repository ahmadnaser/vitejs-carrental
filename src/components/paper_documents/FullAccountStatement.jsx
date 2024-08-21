import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
import moment from 'moment';
import image from '../../assets/images/print_logo.png';
import CairoRegular from '../../Amiri Cairo IBM Plex Arabic/Cairo/static/Cairo-Regular.ttf';
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 10,
    fontFamily: 'Cairo',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  text: {
    fontSize: 8,
    fontFamily: 'Cairo',
  },
  text2: {
    fontSize: 10,
    fontFamily: 'Cairo',
  },
  Column: {
    flexDirection: 'column',
    textAlign: 'right',
  },
  centeredRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  centeredRow2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  table: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  tableColHeader: {
    width: '14.28%',
    padding: 2,
    fontSize: 7,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    textAlign: 'center',
  },
  tableCol: {
    width: '14.28%',
    padding: 2,
    fontSize: 6,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
  lastCol: {
    borderRightWidth: 0,
  },
  redText: {
    color: 'red',
  },
  greenText: {
    color: 'green',
  },
  logo: {
    width: 200,
    height: 100,
  },
  totalsRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
    backgroundColor: '#f5f5f5',
    marginTop: 10,
  },
  totalsCol: {
    width: '14.28%',
    padding: 2,
    fontSize: 7,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
  summarySection: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    backgroundColor: '#f5f5f5',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 10,
    fontFamily: 'Cairo',
  },
});

const AccountStatement = ({ data, startDate, endDate }) => {
  const totals = data.reduce(
    (acc, item) => {
      const payment = parseFloat(item.payment_amount) || 0;
      const expense = parseFloat(item.expense_amount) || 0;
      const requiredOfHim = parseFloat(item.required_of_him) || 0;
      const requiredOfMe = parseFloat(item.required_of_me) || 0;
      acc.requiredOfHim += requiredOfHim;
      acc.requiredOfMe += requiredOfMe;
      acc.totalPayment += payment;
      acc.totalExpense += expense;
      acc.runningTotal += payment - expense;
      return acc;
    },
    { requiredOfHim: 0, requiredOfMe: 0, totalPayment: 0, totalExpense: 0, runningTotal: 0 }
  );

  let runningTotal = 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>العاصور لتأجير السيارات</Text>
            <Text style={styles.headerText2}>سلواد - رام الله</Text>
            <Text style={styles.headerText2}>asour.rental.car@gmail.com</Text>
            <Text style={styles.headerText2}>0595383860 / 0598236606</Text>
          </View>
          <Image style={styles.logo} src={image} />
          <View>
            <Text style={styles.headerText}>Al-Asour Rent a Car</Text>
            <Text style={styles.headerText2}>Silwad - Ramallah</Text>
            <Text style={styles.headerText2}>asour.rental.car@gmail.com</Text>
            <Text style={styles.headerText2}>0595383860 / 0598236606</Text>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.Column}>
            <Text style={styles.text}>التاريخ: {moment().format('YYYY/MM/DD')}</Text>
            <Text style={styles.text}>اصلية</Text>
          </View>
          <Text style={styles.title}>كشف حساب شامل</Text>
        </View>
        {startDate && endDate && (
          <View style={styles.centeredRow}>
            <Text style={styles.text2}>{endDate} حتى</Text>
            <Text style={styles.text2}> من {startDate} </Text>
          </View>
        )}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>المجموع</Text>
            <Text style={styles.tableColHeader}>الدفع</Text>
            <Text style={styles.tableColHeader}>المصاريف</Text>
            <Text style={styles.tableColHeader}>دائن</Text>
            <Text style={styles.tableColHeader}>مدين</Text>
            <Text style={styles.tableColHeader}>التاريخ</Text>
            <Text style={[styles.tableColHeader, styles.lastCol]}>البيان</Text>
          </View>
          {data.map((item, index) => {
            const payment = parseFloat(item.payment_amount) || 0;
            const expense = parseFloat(item.expense_amount) || 0;
            const requiredOfHim = parseFloat(item.required_of_him) || 0;
            const requiredOfMe = parseFloat(item.required_of_me) || 0;
            runningTotal += payment - expense;
            return (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCol]}>{runningTotal.toFixed(2)}</Text>
                <Text style={[styles.tableCol, styles.greenText]}>{payment.toFixed(2)}</Text>
                <Text style={[styles.tableCol, styles.redText]}>{expense.toFixed(2)}</Text>
                <Text style={[styles.tableCol, styles.greenText]}>{requiredOfHim.toFixed(2)}</Text>
                <Text style={[styles.tableCol, styles.redText]}>{requiredOfMe.toFixed(2)}</Text>
                <Text style={styles.tableCol}>{item.date}</Text>
                <Text style={[styles.tableCol, styles.lastCol]}>{item.description}</Text>
              </View>
            );
          })}
          <View style={styles.totalsRow}>
            <Text style={[styles.totalsCol]}>{totals.runningTotal.toFixed(2)}</Text>
            <Text style={[styles.totalsCol, styles.greenText]}>{totals.totalPayment.toFixed(2)}</Text>
            <Text style={[styles.totalsCol, styles.redText]}>{totals.totalExpense.toFixed(2)}</Text>
            <Text style={[styles.totalsCol, styles.greenText]}>{totals.requiredOfHim.toFixed(2)}</Text>
            <Text style={[styles.totalsCol, styles.redText]}>{totals.requiredOfMe.toFixed(2)}</Text>
            <Text style={[styles.totalsCol, styles.lastCol]}></Text>
          </View>
        </View>
        
        <View style={styles.summarySection}>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, styles.greenText]}>{totals.requiredOfHim.toFixed(2)} شيكل</Text>
            <Text style={styles.summaryText}>المبلغ المستحق: </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, styles.greenText]}>{totals.totalPayment.toFixed(2)} شيكل</Text>
            <Text style={styles.summaryText}>إجمالي الدفع: </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>إجمالي المصاريف: </Text>
            <Text style={[styles.summaryText, styles.redText]}>{totals.requiredOfMe.toFixed(2)} شيكل</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, styles.redText]}>{totals.totalExpense.toFixed(2)} شيكل</Text>
            <Text style={styles.summaryText}>إجمالي المصاريف المدفوعة: </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, styles.greenText]}>{(totals.requiredOfHim - totals.totalPayment).toFixed(2)} شيكل</Text>
            <Text style={styles.summaryText}>الديون المستحقة: </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={[styles.summaryText, styles.greenText]}>{totals.runningTotal.toFixed(2)} شيكل</Text>
            <Text style={styles.summaryText}>الرصيد الكلي: </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default AccountStatement;
