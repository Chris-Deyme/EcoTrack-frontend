import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import LongButton from "../components/LongButton";


const { width } = Dimensions.get('window');

const CarouselScreen = ({navigation}) => {
    const [entries, setEntries] = useState([
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
    ]);
    const [activeSlide, setActiveSlide] = useState(0);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );

    const renderPagination = () => (
        <View style={styles.paginationContainer}>
            {entries.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        activeSlide === index ? styles.dotActive : styles.dotInactive,
                    ]}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={require('../assets/Logotype-ecotrack-noir.png')} style={styles.logo} />
            </View>
            <View style={styles.CarouselContainer}>
            <Carousel
                loop
                width={width}
                height={400}
                autoPlay={false}
                data={entries}
                scrollAnimationDuration={1000}
                onSnapToItem={setActiveSlide}
                renderItem={renderItem}
            />
            {renderPagination()}
            </View>
            <LongButton
          color={"#41F67F"}
          onPress={() => navigation.navigate("Signup")}
          text="Créer un compte"
        />
        </View>
    );
};

const styles = StyleSheet.create({
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        margin: 5,
    },
    dotActive: {
        backgroundColor: 'blue',
    },
    dotInactive: {
        backgroundColor: 'gray',
    },
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
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginLeft: 50,
        marginRight: 50
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
    CarouselContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10, // Ou ajoutez un espace au-dessus de la pagination si cela convient mieux à votre mise en page
    },
});

export default CarouselScreen;
