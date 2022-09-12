import React from "react";
import { useForm } from "react-hook-form";

const TestFormHook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="number"
        placeholder="Porcentaje"
        {...register("Porcentaje", { required: true, maxLength: 80 })}
      />
      <input
        type="number"
        placeholder="Costo proveedor"
        {...register("Costo proveedor")}
      />
      <input
        type="number"
        placeholder="Costo Muons:"
        {...register("Costo Muons:", {})}
      />
      <input
        type="text"
        placeholder="Descripción"
        {...register("Descripción", {})}
      />
      <input type="text" placeholder="Unidad" {...register("Unidad", {})} />
      <input
        type="number"
        placeholder="Cantidad"
        {...register("Cantidad", { required: true })}
      />
      <input
        type="number"
        placeholder="Costo unidario"
        {...register("Costo unidario", {})}
      />

      <input type="submit" />
    </form>
  );
};
export default TestFormHook;
