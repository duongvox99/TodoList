import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ACTIVE_BEGIN_COLOR = 'rgb(34, 139, 34)';
const ACTIVE_END_COLOR = ' 	rgb(50, 205, 50)';
const COMPLETED_BEGIN_COLOR = 'rgb(30, 144, 255)';
const COMPLETED_END_COLOR = 'rgb(65, 105, 225)';

const TodoItem = ({ dataTodoItem, dataTodoItem: { id, status, body }, func_CompletedOrActive_OpenDetail, func_DeleteItem, func_OpenDetail, funcSaveEdittedTodoItem}) => (
    <View style={styles.container}>

        <TouchableOpacity
            style={styles.button}
            onPress={() => func_OpenDetail(dataTodoItem)}
            onLongPress={() => func_DeleteItem(id)}
        >

            <LinearGradient
                colors={status === 'Active' ? [ACTIVE_BEGIN_COLOR, ACTIVE_END_COLOR] : [COMPLETED_BEGIN_COLOR, COMPLETED_END_COLOR]}
                style={styles.buttonGradient}
            >
                
                <TouchableOpacity
                    style={styles.deleteTouchable}
                onPress={() => func_CompletedOrActive_OpenDetail(id)}
                >
                    <MaterialCommunityIcons name={status === 'Active' ? 'checkbox-blank-outline' : 'check'} size={25} style={{ marginLeft: 8 }}></MaterialCommunityIcons>
                </TouchableOpacity>

                <Text style={styles.text}>{body}</Text>
            </LinearGradient>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,

    },
    button: {
        borderRadius: 5,
        width: '90%',
        minHeight: 20,
        color: 'white',
        borderRadius: 5,
        flexWrap: 'wrap'
    },
    buttonGradient: {
        flex: 1,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        flex: 0.9,
        padding: 10,
        fontSize: 22,
        fontWeight: '400',
        color: 'white'
    },
    deleteTouchable: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TodoItem;