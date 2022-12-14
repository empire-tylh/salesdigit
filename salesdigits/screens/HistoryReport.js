/* eslint-disable react-native/no-inline-styles */
import {useState, useMemo, useEffect, useCallback, useRef} from 'react';
import * as React from 'react';

import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {COLOR, numberWithCommas, STYLE as styles} from '../AssetDatabase';
import Icon from 'react-native-vector-icons/Ionicons';
import DigitsField from '../components/digitsfield';
import {TwoDigitsContext} from '../context/Context';
import {useMutation, useQuery} from '@tanstack/react-query';
import data from '../server/data';
import {MessageModalNormal} from '../extra/CustomModal';
import DatePicker from 'react-native-date-picker';

const HistoryReport = ({navigation}) => {
  const [luckynumber, setLuckyNumber] = useState('');

  const [view, setView] =
    useState(true); /*true = Digits View And false = User View */

  const [sorttype, setSortype] = useState('Digits');

  const [detailData, setDetailData] = useState([]);

  const [is_uploading, setIsUploading] = useState(false);

  const sales_data = useQuery(['sales2dreport'], data.getsold2d);

  const postdata = useMutation(data.finish2d, {
    onSuccess: () => {
      setIsUploading(false);
      setShowAlert(false);
      titletextRef.current.clear();
      luckynumberref.current.clear();
      report.refetch();
      sales_data.refetch();
      setDate(new Date());
    },
    onMutate: () => {
      setIsUploading(true);
    },
    onError: () => {
      setShowAlert(false);
      luckynumberref.current.clear();
      setDate(new Date());
    },
  });

  const [showSort, setShowSort] = useState(false);

  const onCloseSort = () => {
    setShowSort(false);
  };

  const [detailshow, setDetailshow] = useState(false);

  const onDetailShow = () => {
    setDetailshow(prev => !prev);
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  const luckynumberref = useRef();

  const titleRef = useRef();
  const titletextRef = useRef();


  const report = useQuery(
    ['lucky-report', date.toDateString()],
    data.getCheckTwoDigits,
  );

  report.data && console.log(report.data.data);

  return (
    <>
      <MessageModalNormal show={is_uploading} width={'20%'}>
        <ActivityIndicator size={'large'} color={COLOR.primary2d} />
        <Text style={{color: COLOR.black, textAlign: 'center'}}>Creating</Text>
      </MessageModalNormal>
      <MessageModalNormal
        show={showAlert}
        width={'98%'}
        onClose={() => setShowAlert(false)}>
        <Text style={{...styles.normalboldsize}}>
          ??????????????????????????????????????? {luckynumber} ?????????????????????????????? ??????????????????????????????????
        </Text>
        <Text style={{color: COLOR.black, padding: 5}}>
          ??? functions ????????? ?????????????????? ??????????????????????????????????????????????????? ?????????????????????????????????
          ?????????????????????????????????????????????????????? ????????????????????????????????????????????????????????????????????? ????????????????????????????????????????????? Report
          ??????????????????????????? ???????????????????????????????????????????????????
        </Text>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: COLOR.green}}
          onPress={() => {
            if (sales_data.data && sales_data.data.data !== 0) {
              if(!titletextRef.current)
                  return alert('Please Fill Title')
              if (sales_data.data.data.length >= 1) {
                postdata.mutate({
                  luckynumber,
                  enddate: date,
                  title:titletextRef.current
                });
                setShowAlert(false);
              } else {
                alert('No Report Data');
              }
            } else {
              alert('You can input 2 Lucky Number in One Day');
            }
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
            ?????????????????????????????????
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button, backgroundColor: COLOR.redColor}}
          onPress={() => {
            setShowAlert(false);
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
            ??????????????????????????????
          </Text>
        </TouchableOpacity>
      </MessageModalNormal>
      <View style={{flex: 1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
          <Icon
            name="menu"
            size={30}
            color={COLOR.black}
            style={{paddingTop: 5}}
            onPress={() => navigation.openDrawer()}
          />
          <Text
            style={{
              color: COLOR.black,
              fontWeight: 'bold',
              fontSize: 20,

              marginLeft: 10,
            }}>
            Save 2D Digits
          </Text>
            </View>
           <TouchableOpacity
            onPress={() => {
              report.refetch();
              sales_data.refetch();
            }}>
            <Icon
              name="refresh"
              size={25}
              color={COLOR.black}
              style={{
                padding: 10,
              }}
            />
          </TouchableOpacity>
      </View>
        <View style={{padding: 10}}>
          <Text
            style={{
              color: 'black',
              ...styles.normaltextsize,
              fontWeight: 'bold',
            }}>
            ???????????????????????????????????????????????????
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              ...styles.textinput,
            }}>
            <TextInput
              style={{...styles.textinput, padding: 0, margin: 0, flex: 1}}
              placeholder={'???????????????????????????????????????????????????'}
              value={luckynumber}
              onChangeText={e => setLuckyNumber(e)}
              keyboardType={'number-pad'}
              maxLength={2}
              ref={luckynumberref}
            />
            <Icon
              name={
                luckynumber.length === 2 ? 'checkmark-circle' : 'close-circle'
              }
              size={20}
              color={luckynumber.length === 2 ? COLOR.green : COLOR.redColor}
            />
          </View>
             <Text
            style={{
              color: 'black',
              ...styles.normaltextsize,
              fontWeight: 'bold',
            }}>
            ???????????????????????????
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              ...styles.textinput,
            }}>
            <TextInput
              style={{...styles.textinput, padding: 0, margin: 0, flex: 1}}
              placeholder={'????????????????????????????????????????????????'}
              ref={titleRef}
              onChangeText={(e)=>titletextRef.current=e}
            />
          </View>
          <Text
            style={{
              color: 'black',
              ...styles.normaltextsize,
              fontWeight: 'bold',
            }}>
            ??????????????????
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              ...styles.textinput,
            }}>
            <TextInput
              style={{...styles.textinput, padding: 0, margin: 0, flex: 1}}
              placeholder={'Search with Name or Digit'}
              value={date.toDateString()}
            />
            <Icon
              name="calendar-outline"
              size={20}
              color={COLOR.black}
              onPress={() => setOpen(true)}
            />
            <DatePicker
              modal
              open={open}
              mode={'date'}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <TouchableOpacity
            style={{...styles.button, backgroundColor: COLOR.black}}
            onPress={() => {
              if (luckynumber) {
                setShowAlert(true);
              } else {
                Alert.alert('', '???????????????????????????????????????????????????', [{title: 'OK'}]);
              }
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                ...styles.normalboldsize,
                color: 'white',
              }}>
              ??????????????????????????????????????????????????? ????????????????????????
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />
        <View style={{padding: 10}}>
          {report.isFetching ? 
            <ActivityIndicator size={'large'} color={COLOR.primary2d}/>
            : report.data &&
            report.data.data.map((item, index) => (
              <TouchableOpacity
                style={{...styles.button, backgroundColor: COLOR.primary2d}}
                onPress={() =>
                  navigation.navigate('2dluckyreport', {
                    date: item.end_datetime,
                  })
                }
                key={index}>
                <Text style={{fontWeight: 'bold', ...styles.normalboldsize}}>
                  ???????????? {item.luckyNumber} ??????????????????????????????????????? ???????????????????????????????????????????????????
                </Text>
              </TouchableOpacity>
            ))}

          <View style={styles.divider} />

          <TouchableOpacity
            style={{...styles.button, backgroundColor: COLOR.secondary2d}}
            onPress={() => navigation.navigate('2dhistoryallreport')}>
            <Text style={{fontWeight: 'bold', ...styles.normalboldsize}}>
              ?????????????????????????????????????????????????????? ????????????????????????
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
export default HistoryReport;
