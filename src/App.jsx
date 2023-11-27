import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "ejemplo",
      correo: "ejemplo@tucorreo.com",
    },
  });

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    alert("Enviando datos...");

    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        {...register("nombre", {
          required: {
            value: true,
            message: "Nombre requerido",
          },
          minLength: {
            value: 2,
            message: "El nombre debe tener al menos 2 caracteres",
          },
          maxLength: {
            value: 10,
            message: "El nombre debe tener máximo 10 caracteres",
          },
        })}
      />
      {errors.nombre && <span>{errors.nombre.message}</span>}

      <label htmlFor="correo">Correo</label>
      <input
        type="email"
        {...register("correo", {
          required: {
            value: true,
            message: "Correo requerido",
          },
          pattern: {
            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            message: "Correo inválido",
          },
        })}
      />

      {errors.correo && <span>{errors.correo.message}</span>}

      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", {
          required: {
            value: true,
            message: "Password requerido",
          },
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
      {/* confirmarPassword */}
      <label htmlFor="confirmarPassword">Confirmar Password</label>
      <input
        type="password"
        {...register("confirmarPassword", {
          required: {
            value: true,
            message: "Confirmar password requerido",
          },
          minLength: {
            value: 6,
            message: "El password debe tener al menos 6 caracteres",
          },
          validate: (value) =>
            value === watch("password") || "Los passwords no coinciden",
        })}
      />
      {errors.confirmarPassword && (
        <span>{errors.confirmarPassword.message}</span>
      )}
      {/* fecha de nacimiento  */}

      <label htmlFor="fecha">Fecha de nacimiento</label>
      <input
        type="date"
        {...register("fechaNacimiento", {
          required: {
            value: true,
            message: "Fecha de nacimiento requerida",
          },
          validate: (value) => {
            const fechaNacimiento = new Date(value);
            const fechaActual = new Date();
            const edad =
              fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            return edad >= 18 || "Debe ser mayor de edad";
          },
        })}
      />

      {errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>}

      {/* país */}

      <label htmlFor="pais">País</label>
      <select {...register("pais")}>
        <option value="mx">México</option>
        <option value="co">Colombia</option>
        <option value="ar">Argentina</option>
      </select>

      {watch("pais") === "ar" && (
        <>
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia requerida",
              },
            })}
          />
          {errors.provincia && <span>{errors.provincia.message}</span>}
        </>
      )}

      {/* file */}
      <label htmlFor="foto">Foto de perfil</label>
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.files[0]);
          setValue("fotoDelUsuario", e.target.files[0].name);
        }}
      />

      {/* terminos y condiciones */}
      <label htmlFor="terminos">Acepto términos y condiciones</label>
      <input
        type="checkbox"
        {...register("terminos", {
          required: {
            value: true,
            message: "Debe aceptar los términos y condiciones",
          },
        })}
      />
      {errors.terminos && <span>{errors.terminos.message}</span>}
      {/* boton */}
      <button>Enviar</button>
    </form>
  );
}

export default App;
