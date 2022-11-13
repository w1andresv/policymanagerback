var controller = {};


controller.getConfig = async (req, res, next) => {
  const list = [
    { key: 'coupons', value: true },
    { key: 'home', value: true },
    { key: 'products', value: true },
    { key: 'categorias', value: true },
    { key: 'branches', value: false },
    { key: 'accounts', value: true },
    { key: 'purchases', value: true },
    { key: 'digital-menu', value: true },
    { key: 'bookings', value: true },
    { key: 'campaigns', value: true },
    { key: 'analytical-reports', value: true },
    { key: 'profile', value: true },
    { key: 'schedules', value: true },
    { key: 'table-payments', value: true },
    { key: 'payment-methods', value: true },
    { key: 'orders-report', value: true },
    { key: 'showcases', value: true },
    { key: 'onboarding', value: true },
    { key: 'reports', value: true }
  ];
  console.log(req.headers)
  setTimeout(() => {
    console.log('Se envio la configuración => '+ new Date())
    return res.status(200).json(list);
  }, 100);
};
module.exports = controller;
