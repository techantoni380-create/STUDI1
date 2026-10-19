/* Cálculo de presentación. WooCommerce calcula el precio real en el servidor. */
(() => {
  'use strict';
  function quote(plans, id, familyPeople, limit = 12) {
    const plan = plans.find(p => p.id === id);
    if (!plan || plan.kind !== 'membership' || !plan.id.startsWith('membership-')) return null;
    const people = plan.people || Number(familyPeople);
    if (!Number.isInteger(people) || people < 1 || people > limit) return null;
    const quantity = plan.basis === 'person' ? people : 1;
    return { plan, people, quantity, total: Math.round(Number(plan.price)*quantity*100)/100,
      perPerson: Math.round(Number(plan.price)*quantity/people*100)/100 };
  }
  window.STUDI1_ENROLLMENT = { quote };
})();
