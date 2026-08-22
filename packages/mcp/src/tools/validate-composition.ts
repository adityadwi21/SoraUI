import { validateComposition } from '../validation/index';

export function handleValidateComposition(params: { code: string }) {
  return validateComposition(params.code);
}
