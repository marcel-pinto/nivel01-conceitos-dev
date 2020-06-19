import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('repositories', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Marcel'
        });

        const newRepository = response.data;

        setRepositories([...repositories, newRepository]);
    }

    return(
    <>
        <StatusBar barstyle='light-content' backgroundColor='#7159c1' />
        <SafeAreaView style={styles.container}>
            <FlatList 
                data={repositories}
                keyExtractor={repository => repository.id}
                renderItem={( { item: repository }) => (
                    <Text style={styles.repository}>
                        {repository.title}
                    </Text>
                )}
            />

            <TouchableOpacity 
                activeOpacity={0.6}
                style={styles.button}
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>
        </SafeAreaView>

        {/* <View style={styles.container}>
            {repositories.map(repository => (
            <Text
                key={repository.id}
                style={styles.repository}
            >
                {repository.title}
            </Text>))}
        </View> */}
    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    repository: {
        color: '#FFF',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    }

})