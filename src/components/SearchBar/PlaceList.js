// @flow
import React from 'react';

import { modes } from '../../redux/reducers';

import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

import type { Trip, Location, Place } from '../../Types';

type Props = {
  trip: Trip,
  tripSet: Location => void,
  places: Array<Place>,
  mode: string,
};

class PlaceList extends React.Component {
  constructor(props: Props) {
    super(props);
    this.props = props;
  }

  render() {
    return this.props.mode === modes.searchResults
      ? <View
          style={styles.container}
          pointerEvents={this.props.places.length > 0 ? 'auto' : 'none'}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {this.props.places.map(result =>
              <PlaceCard
                testId={`${result.name}Card`}
                result={result}
                key={result.id}
                onSelect={this.props.tripSet}
              />
            )}
          </ScrollView>
        </View>
      : null;
  }
}

const PlaceCard = ({ result, onSelect }) =>
  <View style={styles.card} testId={result.name}>
    <View style={styles.infoContainer}>
      <Info name={result.name} address={result.vicinity} />
    </View>
    <View style={styles.buttonContainer}>
      <Button
        testId={`${result.name}Button`}
        onSelect={onSelect}
        coordinates={{
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        }}
      />
    </View>
  </View>;

const Button = ({ coordinates, onSelect }) =>
  <TouchableOpacity style={styles.button} onPress={() => onSelect(coordinates)}>
    <Text style={styles.buttonText}>
      GO
    </Text>
  </TouchableOpacity>;

const Info = ({ name, address }) =>
  <View style={{ flex: 1 }}>
    <Text style={styles.title} numberOfLines={2}>{name}</Text>
    <Text style={styles.address}>{address}</Text>
  </View>;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    top: 0,
    width: '100%',
    height: '100%',
    marginRight: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  card: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    margin: 5,
    elevation: 5,
  },
  infoContainer: {
    flex: 4,
    paddingLeft: 10,
    paddingTop: 5,
  },
  title: {
    fontSize: 25,
  },
  address: {
    position: 'absolute',
    bottom: 5,
    fontSize: 15,
    width: '75%',
    color: 'gray',
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  button: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'ghostwhite',
  },
  buttonText: {
    fontSize: 40,
    color: 'deepskyblue',
  },
});

export default PlaceList;
