import { ImCross } from "react-icons/im";
import { useController } from "react-hook-form";

type ControlledBioInputProps = {
  control: any;
  name: string;
  label: string;
  autoComplete: string | undefined;
  bioNow: string;
  setBioNow: (bioNow: string) => void;
};

const ControlledBioInput = ({
  control,
  name,
  label,
  autoComplete,
  bioNow,
  setBioNow,
}: ControlledBioInputProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const MAX_BIO_LENGTH = 1000;

  return (
    <div className="w-full">
      <label htmlFor={field.name} className="font-semibold mb-2 block">{label}</label>
      <div className="relative">
        <textarea
          {...field}
          id={field.name}
          placeholder="Tell other users about yourself..."
          value={bioNow}
          autoFocus={true}
          name={name}
          maxLength={MAX_BIO_LENGTH}
          rows={6}
          className="text-primary w-full rounded border-4 border-secondary p-2 pr-10 resize-none focus:outline-none focus:ring-0"
          autoComplete={autoComplete}
          onChange={(e) => {
            field.onChange(e);
            setBioNow(e.target.value);
          }}
          aria-describedby="bio-helper"
        />
        <p id="bio-helper" className="sr-only">Tell other users about yourself. Maximum {MAX_BIO_LENGTH} characters.</p>
        <div className="absolute bottom-0 right-0 px-7 py-4 flex justify-end" aria-hidden={true}>
          <span className="text-sm text-primary" id="bio-char-count">
            {bioNow.length}/{MAX_BIO_LENGTH}
          </span>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic={true}>
          {MAX_BIO_LENGTH - bioNow.length < 20
            ? `${MAX_BIO_LENGTH - bioNow.length} characters remaining.`
            : ""}
        </p>
        <div className="absolute top-2 right-2">
          <button
            type="button"
            aria-label="Clear biography"
            className="text-secondary hover:text-primary"
            onClick={() => {
              field.onChange("");
              setBioNow("");
            }}
          >
            <ImCross size={14} />
          </button>
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">
            {error.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ControlledBioInput;
