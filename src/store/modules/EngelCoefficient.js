// import DEFAULT_CONFIGS from "../../constants/DefaultConfigs";

const state = {
  enabled: false
};

const mutations = {
  SET_ENABLED(state, value) {
    state.enabled = value;
  }
};

const actions = {
  async updateEnabled({ commit }, value) {
    // todo write to localstorage
    await new Promise(res => {
      setTimeout(() => {
        res();
      }, 1000);
    });
    commit("SET_ENABLED", value);
  }
};

export default {
  state,
  mutations,
  actions
};
