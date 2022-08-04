import axios from 'axios';

const BASE_URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';

function postSignUp(body) {
    const promise = axios.post(`${BASE_URL}/auth/sign-up`, body);
    return promise;
}

function postLogin(body) {
    const promise = axios.post(`${BASE_URL}/auth/login`, body);
    return promise;
}

function postHabit(body, token) {
    const promise = axios.post(`${BASE_URL}/habits`, body, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return promise;
}

function getHabits(token) {
    const promise = axios.get(`${BASE_URL}/habits`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return promise;
}

function deleteHabit(habitId, token) {
    const promise = axios.delete(`${BASE_URL}/habits/${habitId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return promise;
}

function getTodaysHabits(token) {
    const promise = axios.get(`${BASE_URL}/habits/today`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return promise;
}

function postCheckHabit(habitId, token) {
    const promise = axios.post(`${BASE_URL}/habits/${habitId}/check`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return promise;
}

function postUncheckHabit(habitId, token) {
    const promise = axios.post(`${BASE_URL}/habits/${habitId}/uncheck`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
    });
    return promise;
}

function getHabitsHistory() {
    const promise = axios.get(`${BASE_URL}/habits/history/daily`);
    return promise;
}

export { postSignUp, 
    postLogin, 
    postHabit, 
    getHabits, 
    deleteHabit, 
    getTodaysHabits, 
    postCheckHabit, 
    postUncheckHabit, 
    getHabitsHistory 
};