// document.querySelectorAll('.radio-input-pagamentos').forEach(radio => {
//     radio.addEventListener('change', function() {
//         // Remove a classe dos outros labels
//         document.querySelectorAll('.radio-label-pagamentos').forEach(label => {
//             label.classList.remove('selected');
//         });
        
//         document.querySelectorAll('.figure-input-label-pagamento').forEach(figure => {
//             figure.classList.remove('selected');
//         });

//         // Adiciona a classe ao label e figure do radio button selecionado
//         if (this.checked) {
//             this.closest('label').classList.add('selected');
//             this.closest('figure').classList.add('selected');
//         }
//     });
// });

// import { MercadoPagoConfig, Payment } from 'mercadopago';

// const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKEN' });

// const payment = new Payment(client);
// payment.create({ body: req.body })
// .then(console.log)
// .catch(console.log);