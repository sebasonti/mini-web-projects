export default class Utils {
  static getFormField(form, fieldName) {
    const formData = new FormData(form);
    return Object.fromEntries(formData)[fieldName];
  }
}