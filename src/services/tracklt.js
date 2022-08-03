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

function postHabit(body) {
    const promise = axios.post(`${BASE_URL}/habits`, body);
    return promise;
}

function getHabits() {
    const promise = axios.get(`${BASE_URL}/habits`);
    return promise;
}

function delteHabit(habitId, authorizationToken, source) {
    const promise = axios.delete(`${BASE_URL}/habits/${habitId}`, {
        headers: {
          Authorization: authorizationToken
        },
        data: {
          source: source
        }
      });
    return promise;
}

function getTodayHabits() {
    const promise = axios.get(`${BASE_URL}/habits/today`);
    return promise;
}

function postCheckHabit(habitId, body) {
    const promise = axios.post(`${BASE_URL}/habits/${habitId}/check`, body);
    return promise;
}

function postUncheckHabit(habitId, body) {
    const promise = axios.post(`${BASE_URL}/habits/${habitId}/uncheck`, body);
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
    delteHabit, 
    getTodayHabits, 
    postCheckHabit, 
    postUncheckHabit, 
    getHabitsHistory 
};