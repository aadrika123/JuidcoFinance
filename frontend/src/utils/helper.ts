/**
 * | Author- Sanjiv Kumar
 * | Created On- 08-02-2024
 * | Created for- Input Field
 * | Status- done
 */

export default function goBack() {
  // Use the history object to navigate back
  window.history.back();
}

export const filterValBefStoring = (values: any) => {
  function mapingObject(obj: any) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (key.toLowerCase().endsWith("id_name")) {
          delete obj[key];
        }
      }
    }
    return obj;
  }

  if (values.length > 0) {
    return values.map((item: any) => {
      return mapingObject(item); // Return the modified item
    });
  } else {
    return mapingObject(values); // Return the modified values
  }
};
