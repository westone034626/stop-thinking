import Brain from './assets/icons/brain.webp';
import FingerPrint from './assets/icons/fingerprint.webp';
import Replay from './assets/icons/replay.webp';
import { Spacer } from './components';

export default function Main() {
    const styles = {
        container: { alignItems: 'center', margin: 'auto 0px' },
        brain: {},
        timer: { fontSize: 60 },
        finterPrintList: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0px 40px',
        },
        fingerPrint: {},
        finterPrintOverLay: {},
        replay: {},
    };

    return (
        <div style={styles.container}>
            <img style={styles.brain} src={Brain} width={82} height={82} />

            <Spacer spacing={18} />

            <p style={styles.timer}>05:00:00</p>

            <Spacer spacing={20} />

            <div style={styles.finterPrintList}>
                <img style={styles.fingerPrint} src={FingerPrint} width={56} height={56} />
                <img style={styles.fingerPrint} src={FingerPrint} width={56} height={56} />
            </div>

            <Spacer spacing={20} />

            <img style={styles.replay} src={Replay} width={48} height={48} />
        </div>
    );
}