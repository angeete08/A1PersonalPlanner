/* Source: /home/angee/.cache/jac/rt/5f5b81ee119cbe65-4e652f069ef99e75/site/jaclang/client/auth_contract.jac */
class SignupResult {
  constructor(props = {}) {
    this.success = (Object.hasOwn(props, "success") ? props.success : null);
    this.user_id = (Object.hasOwn(props, "user_id") ? props.user_id : "");
    this.error = (Object.hasOwn(props, "error") ? props.error : "");
    this.status = (Object.hasOwn(props, "status") ? props.status : 0);
  }
}
export {SignupResult};
//# sourceMappingURL=auth_contract.js.map
