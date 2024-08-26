import React from 'react';
import image from '../../assets/images/print_logo.png';
import combial from '../../assets/images/combial.png';
import seal from '../../assets/images/company_seal.png';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';
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
    fontSize: 9,
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
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  tableColHeader: {
    width: '20%',
    padding: 2,
    fontSize: 7,
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
    textAlign: 'center',
  },
  tableCol: {
    width: '20%',
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
  combial: {
    width: '50px',
    height: 45,
    marginLeft: 5,
  },
  seal: {
    position: 'absolute',
    top: -25,
    left: '55%',
    transform: 'translateX(-55%)',
    width: '110px',
    height: 55,
  },
  seal2: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: 'translateX(-55%)',
    width: '100px',
    height: 55,
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
    width: '20%',
    padding: 2,
    fontSize: 7,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderRightStyle: 'solid',
  },
  rentalBoxContainer: {
    position: 'absolute',
    top: 140, 
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
},
noText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fe315d',
    marginRight: 5,
},
rentalBox: {
    borderWidth: 1,
    borderColor: '#fe315d',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
},
Box: {
  borderWidth: 1,
  paddingVertical: 5,
  paddingHorizontal: 10,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight:2,
  marginLeft:2,
  marginBottom: 1,
},
Box2: {
  borderWidth: 1,
  paddingVertical: 5,
  paddingHorizontal: 10,
  justifyContent: 'center',
  alignItems: 'center',
  width: '9%',
  marginBottom: 1,
},
boldText: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'right',
},
boldText2: {
  fontSize: 8,
  fontWeight: 'bold',
  textAlign: 'left',
},
tableContainer: {
  flexDirection: 'row', 
  justifyContent: 'space-between',
  marginTop: 20,
  height: '36%',

},

tableContainer2: {
  flexDirection: 'row', 
  justifyContent: 'space-between',
  marginTop: 5,
  height: '6%',

},
table: {
  width: '48%',
  borderWidth: 1,
  borderColor: '#fe315d',
  height: '100%'
},
fullWidthTable: {
  width: '48%', 
  height:'100%',
  borderWidth: 1,
  borderColor: '#fe315d',
  marginTop: 3,
},
row: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderColor: '#fe315d',
  paddingVertical: 5,
  paddingHorizontal: 10,
},
row5: {
  flexDirection: 'row',
  paddingVertical: 2,
  paddingHorizontal: 5,
  justifyContent: 'space-between',
},
row2: {
  paddingVertical: 5,
  paddingHorizontal: 10,
},
row3: {
  flexDirection: 'row',
  borderColor: '#fe315d',
  paddingVertical: 5,
  height: '20%',
  paddingHorizontal: 10,
},
row4: {
  flexDirection: 'row',
  borderColor: '#fe315d',
  borderBottomWidth: 1,
  paddingVertical: 5,
  height: '20%',
  paddingHorizontal: 10,
},
cell: {
  flex: 1,
  fontSize: 8,
  textAlign: 'left',
},
cellBold: {
  flex: 1,
  fontSize: 7,
  fontWeight: 'bold',
  textAlign: 'left',
},
cellBold2: {
  flex: 1,
  fontSize: 7,
  fontWeight: 'bold',
  textAlign: 'right',
},
footerText: {
  marginTop: 10,
  fontSize: 10,
  textAlign: 'center',
},
textContainer: {
  marginTop: 3,
  padding: 10,
  borderRadius: 6,
},
noteText: {
  fontSize: 8,
  fontFamily: 'Cairo',
  textAlign: 'right',
},
signatureRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 5,
},
signatureText: {
  fontSize: 10,
  fontFamily: 'Cairo',
  textAlign: 'center',
},
signatureLine: {
  marginTop: 15,
  borderBottom: '1px solid black',
  width: '60%',
  alignSelf: 'center',
},
cutLineContainer: {
  marginTop: 15,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
},
cutLine: {
  width: '100%',
  borderBottom: '1px dashed black',
},
scissorsText: {
  fontSize: 7,
  marginLeft: 2,
  marginRight: 2,
},
formSection: {
  marginTop: 10,
  borderWidth: 1,
  borderColor: 'red',
  padding: 5,
},
formRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 1,
},

formRow2: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center', 
},
formRow4: {
  flexDirection: 'column',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',

},
formRow5: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',

},
formRow3: {
  flexDirection: 'row',
  justifyContent: 'center', 
  alignItems: 'center', 
  marginTop: 1,
},
formColumn: {
  flexDirection: 'column',
  justifyContent: 'flex-start',
},
formText: {
  fontSize: 7,
  fontFamily: 'Cairo',
  textAlign: 'right',
  marginBottom: 1,
},
formText2: {
  fontSize: 7,
  fontFamily: 'Cairo',
  textAlign: 'right',
  marginBottom: 1,
},
formInput: {
  borderBottom: '1px solid black',
  marginBottom: 2,
  width: '100%',
},
formInputWide: {
  borderBottom: '1px solid black',
  marginBottom: 2,
  width: '100%',
},
formTextArea: {
  borderWidth: 1,
  borderColor: 'black',
  padding: 5,
  width: '100%',
  height: 45,
},
formSignature: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
},
formSignatureLine: {
  borderBottom: '1px solid black',
  width: '70%',
  alignSelf: 'center',
},
formNote: {
  fontSize: 8,
  fontFamily: 'Cairo',
  textAlign: 'right',
  marginRight:2,
  marginLeft: 2,
},
formNumber: {
  fontSize: 11,
  fontFamily: 'Cairo',
  textAlign: 'center',
  marginTop: 5,
  fontWeight: 'bold',
},
decorativeText: {
  writingMode: 'vertical-rl',
  transform: 'rotate(180deg)',
  fontSize: 20,
  textAlign: 'center',
  marginTop: -8,
},
blueBox: {
  borderColor: '#5a9cff',
  borderWidth: 1,
  padding: 10,
  marginVertical: 2,
  position: 'relative',
},
formTextBlueBox: {
  fontSize: 9,
  fontFamily: 'Cairo',
  textAlign: 'right',
  marginBottom: 2,
  lineHeight: 1.5,
},
});

const Contract = ({ formData, tenant, car }) => {

  const calculateDays = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
};

const numberOfDays = calculateDays(formData.start_date, formData.end_date);
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
                <View style={styles.rentalBoxContainer}>
                    <Text style={styles.noText}>No.</Text>
                    <View style={styles.rentalBox}>
                        <Text style={styles.boldText}>{formData.rental_id}</Text>
                    </View>
                </View>

                <View style={styles.tableContainer}>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Car</Text>
                            <Text style={styles.cell}> {car.make} {car.model}</Text>
                            <Text style={styles.cellBold2}>السيارة</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Rrg.No</Text>
                            <Text style={styles.cell}>{formData.vehicle_id}</Text>
                            <Text style={styles.cellBold2}>رقم السيارة</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>No Of Days</Text>
                            <Text style={styles.cell}>{numberOfDays}</Text>
                            <Text style={styles.cellBold2}>عدد الايام</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Date of Return</Text>
                            <Text style={styles.cell}>{formData.end_date}</Text>
                            <Text style={styles.cellBold2}>تاريخ الارجاع</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Daily Charges</Text>
                            <Text style={styles.cell}>{formData.price_perday}</Text>
                            <Text style={styles.cellBold2}>الاجرة اليومية</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Out Date</Text>
                            <Text style={styles.cell}>{formData.start_date}</Text>
                            <Text style={styles.cellBold2}>تاريخ الخروج</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Counter</Text>
                            <Text style={styles.cell}>{car.mileage}</Text>
                            <Text style={styles.cellBold2}>عداد السيارة</Text>
                        </View>
                        <View style={styles.row3}>
                            <Text style={styles.cellBold}>Car checked by</Text>
                            <Text style={styles.cellBold2}>فحص السيارة</Text>
                        </View>
                    </View>

                    <View style={styles.table}>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Renter</Text>
                            <Text style={styles.cell}>{tenant.tenant_name}</Text>
                            <Text style={styles.cellBold2}>اسم المستأجر</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Place of Residence</Text>
                            <Text style={styles.cell}>{tenant.address}</Text>
                            <Text style={styles.cellBold2}>بلد المستأجر</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>ID.No / Birth Date</Text>
                            <Text style={styles.cell}>{tenant.id_number} {tenant.birth_date}</Text>
                            <Text style={styles.cellBold2}>رقم الهوية/تاريخ الميلاد </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>ID.No / Exp Date</Text>
                            <Text style={styles.cell}>{tenant.license_number} {tenant.license_end_date}</Text>
                            <Text style={styles.cellBold2}> الرخصة/تاريخ انتهائها</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Address</Text>
                            <Text style={styles.cell}>{tenant.address}</Text>
                            <Text style={styles.cellBold2}>العنوان</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.cellBold}>Tel</Text>
                            <Text style={styles.cell}>{tenant.phone_number}</Text>
                            <Text style={styles.cellBold2}>الهاتف</Text>
                        </View>
                        <View style={styles.row4}>
                            <Text style={styles.cellBold}>Additional Drivers</Text>
                            <Text style={styles.cellBold2}>سائقين آخرين</Text>
                        </View>
                        <View style={styles.row2}>
                            <Text style={styles.boldText}>
                                لقد قرأت التعليمات والشروط المذكورة على جانبي هذه الاتفاقية ووافقت عليها.
                            </Text>
                            <Text style={styles.boldText2}>
                                I have read the instructions and conditions mentioned in the agreement and agree to it.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tableContainer2}>
                  <View style={styles.fullWidthTable}>
                      <View style={styles.row2}>
                          <Text style={styles.cellBold}>Payments</Text>
                          <Text style={styles.cellBold2}>الدفعات</Text>
                      </View>
                  </View>
                  <View style={styles.fullWidthTable}>
                      <View style={styles.row2}>
                          <Text style={styles.cellBold2}>:ملاحظات</Text>
                      </View>
                  </View>
                  
                  </View>

                <View style={styles.textContainer}>
                    <Text style={styles.noteText}>
                        انا الموقع ادناه أقر أنني استلمت السيارة خالية من أي ملاحظات وانا على استعداد لدفع تكاليف أي ضربات أو جروح أو أي ضرر بالسيارة من سوء استعمال، وأن ما جاء في هذا التقصير رسوم الحادث والبالغة 10000 شيكل، مع علم المستأجر بأن عطل السيارة أو نقصان من قيمة السيارة لا يغطيها التأمين مما يحق لشركة العاصور مطالبة المستأجر بهذه المبلغ المطلوبة قد تم التوقيع عليها بقيمة السيارة كاملة.
                    </Text>
                    <Text style={styles.noteText}>
                        * كل ساعة تأخير بـ 50 شيكل. يجب ارجاع السيارة مسؤولة عن الأبواب بـ 100 شيكل للطافة الواحدة.
                    </Text>
                    <View style={styles.signatureRow}>
                        <View>
                            <Text style={styles.signatureText}>توقيع المستأجر</Text>
                            <View style={styles.signatureLine}></View>
                        </View>
                        <View>
                            <Text style={styles.signatureText}>توقيع المسؤول</Text>
                            <View style={styles.signatureLine}></View>
                        </View>
                        <Image style={styles.seal2} src={seal} />
                    </View>
                    <View style={styles.cutLineContainer}>
                        <Text style={styles.scissorsText}>✂</Text>
                        <View style={styles.cutLine}></View>
                        <Text style={styles.scissorsText}>✂</Text>
                    </View>
                    <View style={styles.formSection}>
                      <View style={styles.formRow}>
                          <Text style={styles.formText}>20     /    /                  الاستحقاق</Text>
                          <Text style={styles.formText}>..........................     العنوان</Text>
                          <Text style={styles.formText}>..........................         الاسم</Text>
                      </View>
                      <View style={styles.formRow2}>
                          <View style={styles.Box2}></View>
                          <View style={styles.Box}></View>
                          <Text style={styles.formText2}>            والدفع بها ...........................................................</Text>
                      </View>

                      <View style={styles.formRow3}>
                          <Text style={styles.formText2}>              ........................................................... مبلغ وقدره</Text>
                      </View>

                      <View style={styles.formRow4}>
                        <View style={styles.formRow4}>
                          <Text style={styles.formNote}>
                              ......................... بموجب هذه الكمبيالة وبتاريخ .......................... دفع لأمر السيد ........................................... المبلغ المرقوم أعلاه وقدره 
                          </Text>
                        </View>
                        <View style={styles.formRow4}>
                          <Text style={styles.formNote}>
                              بموجب هذه الكمبيالة فإنني أفوض السيد ............................................................. بكتابة المبلغ النقدي الذي يجب عليه دفعه له بتاریخ استحقاق قيمة الكمبيالة دون تقسيط، وأقر أن قيمة الكمبيالة لا تخضع لأي تسوية مالية تحت أي ظرف من الظروف ولا بأي حال من الأحوال.
                          </Text>
                        </View>
                        <View style={styles.formRow5}>
                          <View style={styles.formRow5}>
                            <Text style={styles.formNote}>
                                    ..................................... توقيع المدين المقر بما فيه             
                            </Text>
                            <Text style={styles.formNote}>
                                 {tenant.id_number}  رقم هوية المدين       
                            </Text>
                          </View>
                          <Image style={styles.combial} src={combial} />
                        </View>
                        </View>
                      </View>
                    </View>
            </Page>
            <Page size="A4" style={styles.page}>
                <View style={styles.blueBox}>
                  <Image style={styles.seal} src={seal} />
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>General Conditions and Precaution</Text>
                      <Text style={styles.cellBold2}>شروط ومعلومات عامة</Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>Vehicle Usage</Text>
                      <Text style={styles.cellBold2}>استعمال السيارة</Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Driver Must be at least 22 - 24 years old Carrying Drivers License Must be At least 1 years old.
                      </Text>
                      <Text style={styles.cellBold2}>
                           ألا يقل عمر السائق عن 22 - 24 سنة ويحمل رخصة سواقة لا تقل عن سنة
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Only Mentioned drivers in the agreement drive the Vehicle.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يتم قيادة السيارة فقط من قبل السائقين المذكورين في العقد ولا يسمح لأي سائق آخر بقيادتها
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter must return the Vehicle in the condition similar to Which it was Provided from all side (interior and exterior).
                      </Text>
                      <Text style={styles.cellBold2}>
                           يتعهد المستأجر بإعادة السيارة بنفس الحالة التي استلمها بها من جميع الجوانب الداخلية والخارجية
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter abides all rules and regulation by the country
                      </Text>
                      <Text style={styles.cellBold2}>
                           يلتزم المستأجر بالتقيد بالقوانين والأنظمة المعمول بها في الدولة
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter must not transfer any illegal materials, Drivers must not be Drunk or under the influence of alcohol
                      </Text>
                      <Text style={styles.cellBold2}>
                           لا يجوز للمستأجر نقل أو تخزين مواد غير قانونية، ولا يجوز للسائقين أن يكونوا تحت تأثير الكحول
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          In case of traffic or legal violation, the renter is obligated to report to the nearest police station.
                      </Text>
                      <Text style={styles.cellBold2}>
                           في حال ارتكاب أي مخالفة مرورية أو قانونية، يتعهد المستأجر بإبلاغ أقرب مركز شرطة
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter is obligated to notify the company directly if an accident happens. Renter must not move the car from the accident location.
                      </Text>
                      <Text style={styles.cellBold2}>
                             المستأجر ملزم بإبلاغ الشركة فور وقوع أي حادث وعدم تحريك السيارة من مكان الحادث
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter must report directly to the police if all accident happens and must take accident report directly or any related reports.
                      </Text>
                      <Text style={styles.cellBold2}>
                             المستأجر ملزم بإبلاغ الشرطة فور وقوع الحادث والحصول على تقرير الحادث مباشرةً أو أي تقارير ذات صلة
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Rentar must do all procedures in all related legal entities and insurance company.
                      </Text>
                      <Text style={styles.cellBold2}>
                          المستأجر ملزم بإتمام جميع الإجراءات القانونية والتأمينية ذات الصلة
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter must pay the accident fees of 8000 NIS directly after the accident
                      </Text>
                      <Text style={styles.cellBold2}>
                           المستأجر ملزم بدفع رسوم الحادث البالغة 8000 شيكل فورًا بعد وقوع الحادث
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          If the responsibility in the accident is not on the renter, the renter must obtain the cost of repairing the accident from the other party or must obtain insurance coverage.
                      </Text>
                      <Text style={styles.cellBold2}>
                          إذا كانت المسؤولية في الحادث ليست على المستأجر، يجب على المستأجر تحصيل تكلفة إصلاح الحادث من الطرف الآخر أو الحصول على تغطية تأمينية
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Vehicle Renter fees must be prepaid or as it agreed with the company.
                      </Text>
                      <Text style={styles.cellBold2}>
                          الرسوم المالية لاستئجار السيارة يجب أن تُدفع مسبقاً أو حسب الاتفاق مع الشركة
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Accident fees to be paid directly after the accident.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يجب دفع رسوم الحادث مباشرةً بعد وقوع الحادث
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter must pay full cost of any damage resulting of misuse for mechanical and body damages.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يتحمل المستأجر التكلفة الكاملة لأي ضرر ناتج عن سوء استخدام السيارة، بما في ذلك الأضرار الميكانيكية والهيكلية
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter fully pays the cost of any value loss after the accident.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يتحمل المستأجر تكلفة أي خسارة في قيمة السيارة بعد وقوع الحادث
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter pays all other financial obligations resulting from the accident.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يتحمل المستأجر جميع الالتزامات المالية الأخرى الناتجة عن الحادث
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter is committed to pay all of the cost of the accident in case the insurance did not cover the accident.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يلتزم المستأجر بدفع التكلفة الكاملة للحادث في حال لم يغطي التأمين التكاليف
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          In case of total loss, the market value of the vehicle is used to calculate the amount to be paid to recover the difference between the insurance coverage of its value, the renter fully pays the difference.
                      </Text>
                      <Text style={styles.cellBold2}>
                           في حال الفقدان الكلي، يتم استخدام قيمة السوق للسيارة لحساب المبلغ الذي يجب دفعه لاستعادة الفارق بين تغطية التأمين وقيمتها السوقية، ويجب على المستأجر دفع الفارق كاملاً
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter must pay rental fees when the vehicle is under repair in addition to paying all the repair costs.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يجب على المستأجر دفع رسوم الإيجار عندما تكون السيارة تحت الإصلاح بالإضافة إلى تحمل تكاليف الإصلاح بالكامل
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          Renter must pay any legal liability in case of traffic or legal violation.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يجب على المستأجر دفع أي مسؤولية قانونية في حالة وقوع مخالفة مرورية أو قانونية
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          If the vehicle breaks down or its market value decreases and is not covered by insurance, the renter is responsible for the full compensation costs.
                      </Text>
                      <Text style={styles.cellBold2}>
                           في حالة تعطل السيارة أو نقص في قيمتها السوقية لا يغطيها التأمين، يتحمل المستأجر التكاليف الكاملة للتعويض
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          If the vehicle is replaced during the rental period, the renter must pay any difference in the value of the replaced vehicle.
                      </Text>
                      <Text style={styles.cellBold2}>
                           إذا تم استبدال السيارة خلال فترة الإيجار، يجب على المستأجر دفع أي فرق في قيمة السيارة المستبدلة
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          The renter is prohibited from using the vehicle for any purposes not specified in the contract and must not use it for any illegal activities.
                      </Text>
                      <Text style={styles.cellBold2}>
                          يُمنع على المستأجر استخدام السيارة لأي أغراض غير منصوص عليها في العقد. ولا يجوز استخدامها في أي أنشطة غير قانونية
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          The renter must return the vehicle at the specified time and in the same condition as it was received. In case of delay, the renter will incur additional charges.
                      </Text>
                      <Text style={styles.cellBold2}>
                           يجب على المستأجر إعادة السيارة في موعدها المحدد وفي نفس الحالة التي استلمها بها. وفي حالة التأخير، يتحمل المستأجر رسوم إضافية
                      </Text>
                  </View>
                  <View style={styles.row5}>
                      <Text style={styles.cellBold}>
                          The renter is fully responsible for any damages or additional repair costs that may arise after returning the vehicle.
                      </Text>
                      <Text style={styles.cellBold2}>
                            يتحمل المستأجر المسؤولية الكاملة عن أي أضرار أو تكاليف إصلاحات إضافية قد تنشأ بعد إعادة السيارة
                      </Text>
                  </View>



                </View>
            </Page>
        </Document>
    );
};

export default Contract;
