import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ViewPackageCard from './ViewPackageCard';
import { useContext } from 'react';
import { AppContent } from '../store/AppContent';

export default function ViewReport({ data }) {
  console.log('reportFunc', data);
  return (
    <View style={styles.parantView}>
      <View style={styles.textRefParent}>
        <Text style={styles.texRef}>Total Revenue: </Text>
        <Text style={styles.textRep}>{data.totalRevenue}</Text>
      </View>
      <View style={styles.separator} />

      <View style={styles.textRefParent}>
        <Text style={styles.texRef}>Pre-Defined Packages Revenue: </Text>
        <Text style={styles.textRep}>{data.preDefinedPackageRevenue}</Text>
      </View>
      <View style={styles.separator} />

      <View style={styles.textRefParent}>
        <Text style={styles.texRef}>Custome Packages Revenue: </Text>
        <Text style={styles.textRep}>{data.customPackageRevenue}</Text>
      </View>
      <View style={styles.separator} />

      <View style={styles.textRefParent}>
        <Text style={styles.texRef}>Cunstom Package Sold Count: </Text>
        <Text style={styles.textRep}>{data.customPackagesSoldCount}</Text>
      </View>
      <View style={styles.separator} />

      <Text style={[styles.texRef, { marginTop: 10, paddingLeft: 5 }]}>
        Pre-Defined Package Sold Count:
      </Text>
      <View>
        {data.preDefinedPackageSoldCount.map((item) => (
          <View style={[styles.textRefParent, { marginLeft: 10 }]} key={item}>
            <Text style={styles.texRef}>{item.packageName}: </Text>
            <Text style={styles.textRep}>{item.soldCounts}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = {
  parantView: {
    flex: 1,
    width: '100%',
    paddingLeft: 10,
    marginTop: 20,
    backgroundColor: '#F5F5F5',
  },
  textRefParent: {
    flexDirection: 'row',
    padding: 5,
  },
  texRef: {
    fontSize: 15,
    color: '#616161',
    fontWeight: '500',
  },
  textRep: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '700',
  },
  separator: {
    width: '90%',
    height: 1,
    backgroundColor: '#BDBDBD',
  },
};
