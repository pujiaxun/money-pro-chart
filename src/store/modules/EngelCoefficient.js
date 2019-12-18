// import DEFAULT_CONFIGS from "../../constants/DefaultConfigs";

const state = {
  enabled: false
};

const mutations = {
  SET_CONFIG(state, { field, value }) {
    state[field] = value;
  }
};

const actions = {
  async updateConfig({ commit }, { field, value }) {
    // todo write to localstorage
    await new Promise(res => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    commit("SET_CONFIG", { field, value });
  }
};

export default {
  state,
  mutations,
  actions
};
