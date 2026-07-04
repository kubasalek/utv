import '@/assets/css/styles.min.css';

import Card from '@/components/global/Card';
import Row from '@/components/global/Row';


import { Icon } from '@iconify/react';


export default async function Page() {
  	return (
		<Row>
			<Card title="Lista materiałów" subtitle="Tu będzie tabela z sortowaniem i filtrowaniem" width={12} />
		</ Row>
	);
}
