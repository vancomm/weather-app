export default function isSuccessful<T>(
  option: Optional<T>
): option is Successful<T> {
  return option.success;
}
