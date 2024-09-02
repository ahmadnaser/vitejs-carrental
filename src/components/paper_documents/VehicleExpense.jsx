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
    textAlign: 'left',
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
    width: '11.1%', 
    padding: 2,
    fontSize: 7,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    textAlign: 'center',
  },
  tableCol: {
    width: '11.1%',
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
    width: '200px',
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
    width: '11.1%',
    padding: 2,
    fontSize: 7,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
});

const VehicleExpense = ({ data, startDate, endDate, vehicleName }) => {
  const totals = data.reduce(
    (acc, item) => {
      const sparePartsPrice = parseFloat(item.spare_parts_price) || 0;
      const garageExpensesAmount = parseFloat(item.garage_expenses_amount) || 0;
      const sparePartsExpensesAmount = parseFloat(item.spare_parts_expenses_amount) || 0;
      const totalExpenses = parseFloat(item.total_expenses) || 0;
      const cost = parseFloat(item.cost) || 0;

      acc.totalSparePartsPrice += sparePartsPrice;
      acc.totalGarageExpensesAmount += garageExpensesAmount;
      acc.totalSparePartsExpensesAmount += sparePartsExpensesAmount;
      acc.totalExpenses += totalExpenses;
      acc.totalCost += cost;

      return acc;
    },
    {
      totalSparePartsPrice: 0,
      totalGarageExpensesAmount: 0,
      totalSparePartsExpensesAmount: 0,
      totalExpenses: 0,
      totalCost: 0,
    }
  );

  const remainingAmount = (totals.totalSparePartsPrice + totals.totalCost) - totals.totalExpenses;

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
          <Text style={styles.title}>كشف مصاريف السيارة - {vehicleName}</Text>
        </View>
        {startDate && endDate && (
          <View style={styles.centeredRow}>
            <Text style={styles.text2}>{endDate} حتى</Text>
            <Text style={styles.text2}> من {startDate} </Text>
          </View>
        )}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableColHeader}>التاريخ</Text>
            <Text style={styles.tableColHeader}>التفاصيل</Text>
            <Text style={styles.tableColHeader}>التكلفة</Text>
            <Text style={styles.tableColHeader}>القطع</Text>
            <Text style={styles.tableColHeader}>سعر القطع</Text>
            <Text style={styles.tableColHeader}>مصاريف الكراج</Text>
            <Text style={styles.tableColHeader}>مصاريف القطع</Text>
            <Text style={styles.tableColHeader}>إجمالي المصاريف (المدفوعة)</Text>
            <Text style={[styles.tableColHeader, styles.lastCol]}>المتبقي</Text>
          </View>
          {data.map((item, index) => {
            const sparePartsPrice = parseFloat(item.spare_parts_price) || 0;
            const garageExpensesAmount = parseFloat(item.garage_expenses_amount) || 0;
            const sparePartsExpensesAmount = parseFloat(item.spare_parts_expenses_amount) || 0;
            const totalExpenses = parseFloat(item.total_expenses) || 0;
            const cost = parseFloat(item.cost) || 0;
            const remainAmount = (sparePartsPrice + cost) - totalExpenses;

            return (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCol}>{item.maintenance_date}</Text>
                <Text style={styles.tableCol}>{item.details}</Text>
                <Text style={styles.tableCol}>{cost.toFixed(2)}</Text>
                <Text style={styles.tableCol}>{item.spare_parts}</Text>
                <Text style={styles.tableCol}>{sparePartsPrice.toFixed(2)}</Text>
                <Text style={styles.tableCol}>{garageExpensesAmount.toFixed(2)}</Text>
                <Text style={styles.tableCol}>{sparePartsExpensesAmount.toFixed(2)}</Text>
                <Text style={styles.tableCol}>{totalExpenses.toFixed(2)}</Text>
                <Text style={[styles.tableCol, styles.lastCol]}>{remainAmount.toFixed(2)}</Text>
              </View>
            );
          })}
          <View style={styles.totalsRow}>
            <Text style={styles.totalsCol}></Text>
            <Text style={styles.totalsCol}></Text>
            <Text style={styles.totalsCol}>{totals.totalCost.toFixed(2)}</Text>
            <Text style={styles.totalsCol}></Text>
            <Text style={styles.totalsCol}>{totals.totalSparePartsPrice.toFixed(2)}</Text>
            <Text style={styles.totalsCol}>{totals.totalGarageExpensesAmount.toFixed(2)}</Text>
            <Text style={styles.totalsCol}>{totals.totalSparePartsExpensesAmount.toFixed(2)}</Text>
            <Text style={styles.totalsCol}>{totals.totalExpenses.toFixed(2)}</Text>
            <Text style={[styles.totalsCol, styles.lastCol]}>{remainingAmount.toFixed(2)}</Text>
          </View>
        </View>
        <View style={[styles.centeredRow2, styles.redText]}>
          <Text style={styles.text2}>الرصيد: {remainingAmount.toFixed(2)} شيكل</Text>
        </View>
      </Page>
    </Document>
  );
};

export default VehicleExpense;
