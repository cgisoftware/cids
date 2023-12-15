import { useSnackbar } from '../../util'

const copiarPrograma = async (nomePrograma) => {
  await navigator.clipboard.writeText(nomePrograma)

  useSnackbar().show({
    message: `Copiado ${nomePrograma} para a área de transferência`,
    color: 'primary',
  })
}

export default copiarPrograma
