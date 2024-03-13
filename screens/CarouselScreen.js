import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LongButton from '../components/LongButton';

const { width } = Dimensions.get('window');
const itemWidth = width * 0.8; // 80% de la largeur de l'écran

export default class CarouselScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [
                {
                    title: 'Comptabiliser',
                    image: require('../assets/Comptabiliser.png'),
                    description: 'Traquez vos émissions de carbone grâce à un système gamifié.',
                },
                {
                    title: 'Réduire',
                    image: require('../assets/Réduire.png'),
                    description: 'Apprenez comment réduire vos émissions grâce aux quêtes et tips à votre disposition.',
                },
                {
                    title: 'Agir',
                    image: require('../assets/Agir.png'),
                    description: 'Contribuez à améliorer votre impact grâce à un annuaire de structures éco responsables.',
                },
            ],
            activeSlide: 0, // Ajout pour suivre l'index de la diapositive active
        };
    }

    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/Logotype-ecotrack-noir.png')} style={styles.logo} />
                </View>
                <Carousel
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={width}
                    itemWidth={itemWidth}
                    onSnapToItem={(index) => this.setState({ activeSlide: index })}
                />
                <Pagination
                    dotsLength={this.state.entries.length}
                    activeDotIndex={this.state.activeSlide}
                    containerStyle={{ backgroundColor: 'transparent', paddingTop: 10 }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
                <LongButton
                    color={"#41F67F"}
                    onPress={() => this.props.navigation.navigate('ConnectionScreen')}
                    text="Se connecter"
                    style={styles.button}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 40,
    },
    logo: {
        width: 250,
        height: 150,
        resizeMode: 'contain',
    },
    card: {
        width: itemWidth,
        height: 400,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#41F67F',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
    },
});
