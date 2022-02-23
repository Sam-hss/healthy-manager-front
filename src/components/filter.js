export default {
  RoleNameFilter: function (data) {
    let RoleData = JSON.parse(localStorage.getItem("roles"));
    RoleData.forEach(v => {
      if (v.id === data) {
        return v.roleName;
      }
    })
  }
}
